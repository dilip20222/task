import React from 'react'
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const Layout = (props) => {
    return (
        <>
            <Navbar/>
            <div className="d-flex">
            <Sidebar/>
            {props.children}
            </div>
        </>
    )
}

export default Layout
