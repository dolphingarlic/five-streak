import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import MyStreaks from "./components/MyStreaks";
import NavBar from "./components/NavBar";
import axiosInstance from "./axiosApi";

class App extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post("/blacklist/", {
                refresh_token: localStorage.getItem("refresh_token"),
            });
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            axiosInstance.defaults.headers["Authorization"] = null;
            return response;
        } catch (error) {
            console.log(error.stack);
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main>
                    <h1>Five Streak</h1>
                    <Switch>
                        <Route exact path={"/login/"} component={Login} />
                        <Route exact path={"/signup/"} component={Signup} />
                        <Route
                            exact
                            path={"/my-streaks/"}
                            component={MyStreaks}
                        />
                        <Route
                            path={"/"}
                            render={() => <div>Home again</div>}
                        />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
