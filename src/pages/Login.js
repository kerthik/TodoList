import React, { useState ,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { Credentialcontext } from '../App'


const Login = () => {
    const [username,setUsername]=useState("");
    const [password ,setPassword]=useState("");
    const navigate = useNavigate();
    const [,setCredential]=useContext(Credentialcontext)

    const Loginfun=(e)=>{
        e.preventDefault();
        setUsername("")
        setPassword("") 
        
        fetch(`http://localhost:4000/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                })
        }).then(()=>{
            setCredential({
                username
            })
           navigate("/")
        })
       
    }


  return (
    <div>
        <h1>Login Now</h1>
        <form onSubmit={Loginfun}>
            <input placeholder='username' onChange={(e)=>setUsername(e.target.value)  } value={username}/>
            <br/>
            <input placeholder='password'  onChange={(e)=>setPassword(e.target.value)} type='password' value={password}/>
            <br/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login