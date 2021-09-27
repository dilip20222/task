import React , {useState} from 'react'
import SignIn from '../SignIn/SignIn'

export default function Dashboard() {

    const[token , setToken] = useState()

    if(!token){
      return <SignIn setToken={setToken}/>
    }
  
    return (
       <div className="container">
           <h1>Welcome to DashBoard</h1>
       </div>
    )
}
