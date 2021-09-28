import React from 'react'
import './Home.css'
import SignIn from '../SignIn/SignIn';
import SignUp from '../Signup/signup';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Navbar } from '../../Components/Navbar/Navbar';
// import { Demo } from '../../Components/Demo';
import { Redirect } from 'react-router';
import Dashboard from '../Dashboard/Dashboard'
import test from '../../Components/test';

const PrivateRoute = (props) => {
    console.log('PRIVATE ROUTE: ', props.path);
    return localStorage.getItem('tokens') ? (
        <Route {...props} />
    ) : (
        <Redirect to='/' />
    );
};



const Home = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/SignIn" component={SignIn}>
                    </Route>
                    <Route exact path="/SignUp" component={SignUp}>
                    </Route>
                    <Route exact path="/dashboard" component={Dashboard}></Route>
                </Switch>/
            </Router>
        </>
    )
}

export default Home
