import React, { useState } from 'react'

const Register = () => {
    const [username,setUsername]=useState("");
    const [password ,setPassword]=useState("");
    const Register=(e)=>{
        e.preventDefault();
        
        fetch(`http://localhost:4000/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                })
        })
    }

  return (
    <div>
        <h1>Register Now</h1>
        <form onSubmit={Register}>
            <input placeholder='username' onChange={(e)=>setUsername(e.target.value) }/>
            <br/>
            <input placeholder='password'  onChange={(e)=>setPassword(e.target.value)} type='password'/>
            <br/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register