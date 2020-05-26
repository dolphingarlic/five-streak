import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import "./login.module.css";
// import axiosInstance from "../../axiosApi";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { username: "", password: "", login_error: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Form
                        onSubmit={async (e) => {
                            try {
                                await this.props.handleLogin(e, this.state);
                                this.props.history.push("/");
                            } catch (error) {
                                this.setState({
                                    login_error:
                                        "Incorrect username or password",
                                });
                            }
                        }}
                        className="Login"
                    >
                        <h3>Login</h3>
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
                            <Form.Text className="form-text text-danger">
                                {this.state.login_error}
                            </Form.Text>
                        </Form.Group>
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
};

export default Login;
