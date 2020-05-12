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
                {this.props.logged_in ? (
                    <div className="jumbotron">
                        <UpdateStreak />
                    </div>
                ) : (
                    <React.Fragment />
                )}
                <div className="container">
                    <div>
                        <h1>Do the Five</h1>
                        <ol>
                            <li>Wash your hands</li>
                            <li>Cough in your elbow</li>
                            <li>Don't touch your face</li>
                            <li>Keep distance</li>
                            <li>Stay home</li>
                        </ol>
                    </div>
                    <div>
                        <h1>Help stop COVID-19</h1>
                        <ul>
                            <li>Do the Five and keep a streak going!</li>
                            <li>
                                Challenge friends and family to record their
                                streaks!
                            </li>
                            <li>Share your streak on social media!</li>
                        </ul>
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
