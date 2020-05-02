import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import styles from "./login.module.css";
import axiosInstance from "../../axiosApi";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post("/token/obtain/", {
                username: this.state.username,
                password: this.state.password,
            });
            axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            this.props.history.push("/");
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2>Login</h2>
                <Form onSubmit={this.handleSubmit} className="Login">
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={this.state.username}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>
                    <Button block disabled={!this.validateForm()} type="submit">
                        Login
                    </Button>
                </Form>
            </React.Fragment>
        );
    }
}

export default Login;
