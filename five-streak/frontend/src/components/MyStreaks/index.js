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
            let active = Array(), inactive = Array();
            response.data.forEach((streak) => {
                if (streak["active"]) active.push(streak);
                else inactive.push(streak);
            });
            
            this.setState({
                active: active,
                inactive: inactive
            });
        } catch (error) {
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    componentDidMount() {
        this.getStreaks();
    }

    render() {
        console.log(this.state.active);
        console.log(this.state.inactive);
        return (
            <React.Fragment>
                <h2>Active Streaks</h2>
                <ul>
                    {this.state.active.map((streak) => (
                        <li>{streak["start_date"]}</li>
                    ))}
                </ul>

                <h2>Inactive Streaks</h2>
                <ul>
                    {this.state.inactive.map((streak) => (
                        <li>{streak["start_date"]}</li>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

export default MyStreaks;
