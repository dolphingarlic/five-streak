import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// import styles from "./navbar.module.css";

import axiosInstance from "../../axiosApi";

class NavBar extends Component {
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
                <Navbar expand="md" bg="dark" variant="dark">
                    <Link className="navbar-brand" to="/">
                        Five Streak
                    </Link>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/my-streaks/">
                                My Streaks
                            </Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Link className="nav-link" to="/login/">
                                Login
                            </Link>
                            <Link className="nav-link" to="/signup/">
                                Signup
                            </Link>
                            <Button onClick={this.handleLogout}>
                                Logout
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default NavBar;
