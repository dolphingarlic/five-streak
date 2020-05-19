import React, { Component } from "react";
import PropTypes from "prop-types";

import UpdateStreak from "../UpdateStreak";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container fluid text-md-left">
                    <div className="row">
                        <div className="col-md-6">
                            {this.props.logged_in ? (
                                <UpdateStreak />
                            ) : (
                                <img
                                    src="static/frontend/flatten-the-curve.png"
                                    alt="Flatten the curve"
                                    className="w-100"
                                />
                            )}
                        </div>
                        <div className="col-md-6">
                            <div className="mb-4">
                                <h3>Do the Five</h3>
                                <ol>
                                    <li>Wash your hands</li>
                                    <li>Cough in your elbow</li>
                                    <li>Don't touch your face</li>
                                    <li>Keep distance</li>
                                    <li>Stay home</li>
                                </ol>
                            </div>
                            <div>
                                <h3>Help stop COVID-19</h3>
                                <ul>
                                    <li>
                                        Do the Five and keep a streak going!
                                    </li>
                                    <li>Flatten the curve!</li>
                                    <li>
                                        Challenge friends and family to record
                                        their streaks!
                                    </li>
                                    <li>Share your streak on social media!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    logged_in: PropTypes.bool.isRequired,
};

export default Home;
