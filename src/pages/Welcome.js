import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Credentialcontext } from '../App'

const Welcome = () => {
  const [credential]=useContext(Credentialcontext)
  return ( 
    <div>
        <h1>Welcome {credential && credential.username}</h1>
        {/* {console.log('Credential:', credential)}
        {console.log(credential)} */}
         {!credential && <Link to={'/register'}>Register</Link>}
         <br/>
         {!credential && <Link to={'/login'}>Login</Link>}
    </div>
  ) 
}

export default Welcome