import React from 'react'
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/Signup/signup';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from './Pages/Dashboard/Dashboard'
import Update from './Pages/Update/Update';
const PrivateRoute = (props) => {
    console.log('PRIVATE ROUTE: ', props.path);
    return localStorage.getItem('token') ? (
        <Route {...props} />
    ) : (
        <Redirect to='/SignIn' />
    );
};

function App(props) {
  return (
    <>
    <Router>
        <Switch>
            <Route exact path="/SignIn" component={SignIn}>
            </Route>
            <Route exact path="/" component={SignUp}>
            </Route>
            <PrivateRoute exact path="/update" component={Update}>
                </PrivateRoute>
            <PrivateRoute
             exact path="/dashboard" component={Dashboard}>
             </PrivateRoute>
        </Switch>
    </Router>
</>
  );
}

export default App;
