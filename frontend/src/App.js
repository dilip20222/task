import React from "react";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SignUp from "./Pages/Signup/signup";
import SignIn from "./Pages/SignIn/SignIn";
import Update from "./Pages/Update/Update";
import Users from "./Components/userprofile.js/Users";
import Layout from "./Components/Layout/Layout";

const PrivateRoute = (props) => {
  console.log("PRIVATE ROUTE: ", props.path);
  return localStorage.getItem("token") ? (
    <Route {...props} />
  ) : (
    <Redirect to="/SignIn" />
  );
};

function MainLayout() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/update" component={Update} />
        <Route exact path="/users" component={Users} />
      </Switch>
    </Layout>
  );
}

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/SignUp" component={SignUp}></Route>
        <Route exact path="/SignIn" component={SignIn}></Route>
        <PrivateRoute path="/" component={MainLayout}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
