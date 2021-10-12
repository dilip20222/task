    import React from 'react'
    import { Link } from 'react-router-dom'
    
    export const Sidebar = () => {
        return (
                <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: '280px' ,height:'100vh'}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg className="bi me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
      <span className="fs-4">Admin Panel</span>
    </a>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
      <hr />
        <Link to="/dashboard" className="nav-link text-white" aria-current="page">
          <svg className="bi me-2" width="16" height="16"><use ></use></svg>
          Dashboard
        </Link>
      </li>
      <li>
      <hr />
        <Link to="/users" className="nav-link text-white">
          <svg className="bi me-2" width="16" height="16"><use href="#speedometer2"></use></svg>
          Users
        </Link>
      </li>
      <li>
        <hr />
        <Link to="/about" className="nav-link text-white">
          <svg className="bi me-2" width="16" height="16"><use href="#table"></use></svg>
          About
        </Link>
        <hr />
      </li>
      <li>
        <a href="#" className="nav-link text-white">
          <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
          Help
        </a>
        <hr />
      </li>
    </ul>
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
        <strong>mdo</strong>
      </a>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a className="dropdown-item" href="#">New project...</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>  
        )
    }
    