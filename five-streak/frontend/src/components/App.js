import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <nav>
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                </nav>
                <main>
                    <h1>Five Streak</h1>
                    <Switch>
                        <Route exact path={"/login/"} component={Login} />
                        <Route exact path={"/signup/"} component={Signup} />
                        <Route path={"/"} render={() => <div>Home again</div>} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
