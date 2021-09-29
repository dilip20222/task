import React from 'react'
import { Link } from 'react-router-dom'

const head = {
    background: "linear-gradient(#444 , #999 , #333)", 
    width: "100%", 
    display: "flex",
     flexdirection: "column",
     justifyContent: "space-around" ,
     alignItems:'center'
 }

 const ul = {
     display:'flex',
     listStyle:'none',
    
 }
 const li = {
    textDecoration:'none',
    color:'crimson',
    fontSize:'21px',
    padding :'4px 2px 4px 2px',
 }

export const Nav = () => {
    return (
            <div className="con" style={head}>
                <div className="head">
                    <h1>React App</h1>
                </div>
                <div className="menu">
                    <ul style={ul}>
                        <li className="mx-2"  > 
                        <Link to="/SignIn" style={li}>SignIn </Link>
                        </li>
                        <li className="mx-2" > 
                        <Link to="/SignUp" style={li} >SignUp </Link>
                        </li>
                    </ul>
                </div>
            </div>            
    )
}
