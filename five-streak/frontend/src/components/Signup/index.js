import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import "./signup.module.css";
// import axiosInstance from "../../axiosApi";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            signup_errors: {
                username: "",
                email: "",
                password: "",
            },
        };

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
                                await this.props.handleSignup(e, this.state);
                                this.props.history.push("/");
                            } catch (error) {
                                console.log(error.stack);
                                this.setState({
                                    signup_errors: error.response.data,
                                });
                            }
                        }}
                        className="Signup"
                    >
                        <h3>Sign Up</h3>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={this.state.username}
                                onChange={this.handleChange}
                                type="text"
                            />
                            <Form.Text className="form-text text-danger">
                                {this.state.signup_errors.username}
                            </Form.Text>
                        </Form.Group>
                        {/* <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={this.state.email}
                                onChange={this.handleChange}
                                type="text"
                            />
                            <Form.Text className="form-text text-danger">
                                {this.state.signup_errors.email}
                            </Form.Text>
                        </Form.Group> */}
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                            <Form.Text className="form-text text-danger">
                                {this.state.signup_errors.password}
                            </Form.Text>
                        </Form.Group>
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

Signup.propTypes = {
    handleSignup: PropTypes.func.isRequired,
};

export default Signup;
