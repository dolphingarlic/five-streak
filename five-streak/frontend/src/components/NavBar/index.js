import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navbar.module.css";

// import axiosInstance from "../../axiosApi";

class NavBar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar
                    expand="md"
                    bg="success"
                    variant="dark"
                    className="shadow mb-4 topbar static-top"
                >
                    <Link className="navbar-brand" to="/">
                        Five Streak
                    </Link>

                    <Navbar.Toggle aria-controls="navbar-nav" />

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/top-ten/">
                                Top Ten
                            </Link>
                        </Nav>

                        <Nav className="ml-auto">
                            {this.props.logged_in ? (
                                <React.Fragment>
                                    <Link
                                        className="nav-link"
                                        to="/my-streaks/"
                                    >
                                        My Streaks
                                    </Link>
                                    <Link
                                        className="nav-link"
                                        onClick={this.props.handleLogout}
                                        to="/"
                                    >
                                        Logout
                                    </Link>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Link className="nav-link" to="/login/">
                                        Login
                                    </Link>
                                    <Link className="nav-link" to="/signup/">
                                        Signup
                                    </Link>
                                </React.Fragment>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}

NavBar.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default NavBar;
