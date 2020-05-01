import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        try {
            axiosInstance.post("/token/obtain/", {
                username: this.state.username,
                password: this.state.password,
            }).then((response) => {
                axiosInstance.defaults.headers["Authorization"] = "JWT " + response.data.access;
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                return response.data;
            });
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </React.Fragment>
        );
    }
}

export default Login;
