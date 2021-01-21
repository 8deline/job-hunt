import React from "react";
import { Redirect } from "react-router";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/LandingPage/Home";
import Inbox from "./components/Dashboard/inbox";
import SignUp from "./components/LandingPage/SignUp";
import About from "./components/LandingPage/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/users/dashboard"
            render={({ match: { path } }) => (
              <Dashboard>
                <Switch>
                  <Route path={`${path}/inbox`} component={Inbox} />
                  <Redirect exact from={path + "/*"} to={path} />
                </Switch>
              </Dashboard>
            )}
          />
          <Route path="/register" component={SignUp} />
          <Route
            path="/"
            render={({ match: { path } }) => (
              <Home>
                <Switch>
                  <Route path={`${path}about`} component={About} />
                </Switch>
              </Home>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
