import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Credentialcontext } from '../App';
import Todos from '../components/Todos';

const Welcome = () => {
  const [credential ,setCredential]=useContext(Credentialcontext)
  const  logout =()=>{
    setCredential(null)
  }
  return ( 
    <div>
      {credential && <button onClick={logout}>Logout </button>}
        <h1>Make a ToDO  {credential && credential.username}</h1>
        <h1>Make  a day Productive</h1>
        {/* {console.log('Credential:', credential)}
        {console.log(credential)} */}
        
         {!credential && <Link to={'/register'}> <div className='button'>Register</div></Link>}
         <br/><br/>
         {!credential && <Link to={'/login'}><div className='button'>Login</div></Link>}
         {credential && <Todos/>}
    </div>
  ) 
}

export default Welcome