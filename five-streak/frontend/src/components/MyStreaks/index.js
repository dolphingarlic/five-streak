import React, { Component } from "react";

import axiosInstance from "../../axiosApi";

class MyStreaks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: [],
            inactive: [],
        };

        this.getStreaks = this.getStreaks.bind(this);
    }

    async getStreaks() {
        try {
            const response = await axiosInstance.get("/my-streaks/");
            let active = Array(),
                inactive = Array();
            response.data.forEach((streak) => {
                if (streak["active"]) active.push(streak);
                else inactive.push(streak);
            });

            this.setState({
                active: active,
                inactive: inactive,
            });
        } catch (error) {
            throw error;
        }
    }

    componentDidMount() {
        this.getStreaks();
    }

    render() {
        let current;
        if (this.state.active.length) {
            const streak = this.state.active[0];
            current = <React.Fragment>{streak.days}</React.Fragment>;
        } else {
            current = <p className="mb-1">You have no current streak</p>;
        }

        let previous;
        if (this.state.inactive.length) {
            previous = (
                <ul className="list-group">
                    {this.state.inactive.map((streak) => {
                        return (
                            <li
                                key={streak["id"]}
                                className="list-group-item flex-column align-items-start"
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{streak.days}-day Streak</h5>
                                    <small>
                                        {streak.start_date} to {streak.last_updated}
                                    </small>
                                </div>
                                <p className="mb-1">
                                    Average daily actions: {streak.average}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            previous = <p className="mb-1">You have no previous streaks</p>;
        }

        return (
            <React.Fragment>
                <div className="container">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-dark mb-0">Current Streak</h3>
                    </div>
                    {current}

                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-dark mb-0">Previous Streaks</h3>
                    </div>
                    {previous}
                </div>
            </React.Fragment>
        );
    }
}

export default MyStreaks;
