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
                {this.props.logged_in ? <UpdateStreak /> : <React.Fragment />}
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
                            <li>
                                Do the Five and come back tomorrow to keep your
                                streak
                            </li>
                            <li>
                                Challenge friends and family to record their
                                *thing*
                            </li>
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
