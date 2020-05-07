import React, { Component } from "react";

import axiosInstance from "../../axiosApi";

class TopTen extends Component {
    constructor(props) {
        super(props);

        this.state = { top_ten: [] };

        this.getStreaks = this.getStreaks.bind(this);
    }

    async getStreaks() {
        try {
            const response = await axiosInstance.get("/top-ten/");
            this.setState({ top_ten: response.data });
        } catch (error) {
            throw error;
        }
    }

    componentDidMount() {
        this.getStreaks();
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div class="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 class="text-dark mb-0">Top 10 Active Streaks</h3>
                    </div>
                    <ol className="list-group">
                        {this.state.top_ten.map((streak) => {
                            const days = Math.ceil(
                                (Date.now() - Date.parse(streak.start_date)) /
                                    (1000 * 60 * 60 * 24)
                            );
                            const average = (
                                streak.action_count / days
                            ).toFixed(1);

                            return (
                                <li
                                    key={streak["id"]}
                                    className="list-group-item flex-column align-items-start"
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">
                                            {streak.user.username}
                                        </h5>
                                        <small>{days} days</small>
                                    </div>
                                    <p className="mb-1">
                                        Average number of actions: {average}
                                    </p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </React.Fragment>
        );
    }
}

export default TopTen;
