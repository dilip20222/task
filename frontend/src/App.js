import React from "react";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/DashBoard";
import SignUp from "./Pages/Signup/signup";
import SignIn from "./Pages/SignIn/SignIn";
import Users from "./Pages/Users/Users";
import Layout from "./Components/Layout/Layout";
import Update from "./Pages/Profile/Update";
import AddEdit from './Pages/Users/AddEdit'
import AddUser from "./Pages/adduser/AddUser";
import AuthError from "./Components/error/Error";

const PrivateRoute = (props) => {
  console.log("PRIVATE ROUTE: ", props.path);
  return localStorage.getItem("token") ? (
    <Route {...props} />
  ) : (
    <Redirect to="/SignIn" />
  );
};

const ProtectedRoute = ({role = 'admin', ...props}) => {
  console.log("Protected Route: ", props.path);
  return JSON.parse(localStorage.getItem('token')).role === role ? (
    <Route {...props} />
  ) : (
    <Redirect to="/PageNotFound" />
  );
};
function MainLayout() {
  return (
    <Layout>
      <Switch>

        <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} role="admin"/>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/update" component={Update} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/add" component={AddUser} />
        <Route exact path="/users/edit/:id" component={AddEdit} />
      </Switch>
    </Layout>
  );
}

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/SignUp" component={SignUp}></Route>
        <Route exact path="/PageNotFound" component={AuthError}></Route>
        <Route exact path="/SignIn" component={SignIn}></Route>
        <PrivateRoute path="/" component={MainLayout}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
