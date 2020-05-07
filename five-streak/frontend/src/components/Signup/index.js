import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import "./signup.module.css";
// import axiosInstance from "../../axiosApi";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = { username: "", password: "", email: "" };

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
                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-dark mb-0">Signup</h3>
                    </div>
                    <Form
                        onSubmit={(e) => {
                            this.props.handleSignup(e, this.state);
                            this.props.history.push("/");
                        }}
                        className="Signup"
                    >
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={this.state.username}
                                onChange={this.handleChange}
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={this.state.email}
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
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Signup
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
