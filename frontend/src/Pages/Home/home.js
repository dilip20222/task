import React from 'react'
import './Home.css'
import SignIn from '../SignIn/SignIn';
import SignUp from '../Signup/signup';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from '../Dashboard/Dashboard'
import test from '../../Components/test';
import Navbar from '../../Components/Navbar/Navbar'
const PrivateRoute = (props) => {
    console.log('PRIVATE ROUTE: ', props.path);
    return localStorage.getItem('token') ? (
        <Route {...props} />
    ) : (
        <Redirect to='/SignIn' />
    );
};



const Home = (props) => {
    return (
        <>
            <Router>
           
                <Switch>
                    <Route exact path="/SignIn" component={SignIn}>
                    </Route>
                    <Route exact path="/SignUp" component={SignUp}>
                    </Route>
                    <PrivateRoute
                     exact path="/dashboard" component={Dashboard}>
                     </PrivateRoute>
                </Switch>
            </Router>
        </>
    )
}

export default Home
