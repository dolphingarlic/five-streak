import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axiosInstance from "../../axiosApi";

class UpdateStreak extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            done: false,

            wash: false,
            cough: false,
            touch: false,
            distance: false,
            home: false,

            action_count: 0,
            streak: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateStreak = this.updateStreak.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.checked,
            action_count:
                this.state.action_count + (event.target.checked ? 1 : -1),
        });
    }

    async updateStreak(event) {
        event.preventDefault();
        try {
            if (this.state.streak) {
                await axiosInstance.patch(`/streaks/${this.state.streak.id}/`, {
                    action_count:
                        this.state.streak.action_count +
                        this.state.action_count,
                });
            } else {
                console.log(this.state.action_count);
                await axiosInstance.post("/streaks/", {
                    action_count: this.state.action_count,
                });
            }
        } catch (error) {
            throw error;
        }
        this.setState({ done: true });
    }

    async componentDidMount() {
        try {
            const response = await axiosInstance.get("/my-streaks/");
            response.data.forEach((streak) => {
                if (streak["active"]) {
                    if (Date.now() - Date.parse(streak.last_updated) < 86400000)
                        this.setState({ done: true });
                    else this.setState({ done: false, streak: streak });
                }
            });
            this.setState({ ready: true });
        } catch (error) {
            throw error;
        }
    }

    render() {
        if (!this.state.ready) return <React.Fragment />;
        if (this.state.done) return <React.Fragment></React.Fragment>;
        return (
            <Form onSubmit={this.updateStreak}>
                <div className="container fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>Today I...</h1>
                            <Form.Check
                                custom
                                type="checkbox"
                                id="wash"
                                checked={this.state.wash}
                                onChange={this.handleChange}
                                label="washed my hands"
                            />
                            <Form.Check
                                custom
                                type="checkbox"
                                id="cough"
                                checked={this.state.cough}
                                onChange={this.handleChange}
                                label="coughed in my elbow"
                            />
                            <Form.Check
                                custom
                                type="checkbox"
                                id="touch"
                                checked={this.state.touch}
                                onChange={this.handleChange}
                                label="didn't touch my face"
                            />
                            <Form.Check
                                custom
                                type="checkbox"
                                id="distance"
                                checked={this.state.distance}
                                onChange={this.handleChange}
                                label="kept distance"
                            />
                            <Form.Check
                                custom
                                type="checkbox"
                                id="home"
                                checked={this.state.home}
                                onChange={this.handleChange}
                                label="stayed home"
                            />
                        </div>
                        <div className="col-md-6">
                            <Button
                                block
                                disabled={!this.state.action_count}
                                type="submit"
                            >
                                Keep my Streak!
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}

export default UpdateStreak;
