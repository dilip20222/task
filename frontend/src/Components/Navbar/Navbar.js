import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
     
    return (
      
        <nav className=" navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <div className="head">
    <a className="navbar-brand" href="#">Task 1.0 </a>
    </div>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/SignUp">SignUp</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/SignIn">SignIn</Link>
        </li>
        </ul>
    </div>
  </div>
</nav>
    )
}

