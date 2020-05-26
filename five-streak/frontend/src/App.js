import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyStreaks from "./components/MyStreaks";
import TopTen from "./components/TopTen";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";

import axiosInstance from "./axiosApi";

class App extends Component {
    constructor() {
        super();

        this.state = {
            logged_in: localStorage.getItem("access_token") ? true : false,
            username: "",
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    async componentDidMount() {
        if (this.state.logged_in) {
            try {
                const response = await axiosInstance.get("/users/current/");
                this.setState({ username: response.data.username });
            } catch (error) {
                this.setState({ logged_in: false });
            }
        }
    }

    async handleLogin(event, data) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post("/token/obtain/", {
                username: data.username,
                password: data.password,
            });
            axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            this.setState({ logged_in: true });
            const current_user = await axiosInstance.get("/users/current/");
            this.setState({
                logged_in: true,
                username: current_user.data.username,
            });
        } catch (error) {
            throw error;
        }
    }

    async handleSignup(event, data) {
        event.preventDefault();
        try {
            await axiosInstance.post("/users/", {
                username: data.username,
                email: data.email,
                password: data.password,
            });
            await this.handleLogin(event, data);
        } catch (error) {
            throw error;
        }
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post("/blacklist/", {
                refresh_token: localStorage.getItem("refresh_token"),
            });
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            axiosInstance.defaults.headers["Authorization"] = null;

            this.setState({ logged_in: false, username: "" });
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar
                    logged_in={this.state.logged_in}
                    username={this.state.username}
                    handleLogout={this.handleLogout}
                />
                <main>
                    <Switch>
                        <Route
                            exact
                            path={"/login/"}
                            component={(props) => (
                                <Login
                                    handleLogin={this.handleLogin}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={"/signup/"}
                            component={(props) => (
                                <Signup
                                    handleSignup={this.handleSignup}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={"/my-streaks/"}
                            component={(props) => (
                                <MyStreaks
                                    username={this.state.username}
                                    {...props}
                                />
                            )}
                        />
                        <Route exact path={"/top-ten/"} component={TopTen} />
                        <Route
                            path={"/"}
                            component={(props) => (
                                <Home
                                    logged_in={this.state.logged_in}
                                    {...props}
                                />
                            )}
                        />
                    </Switch>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
