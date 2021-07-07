import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
      
  {/*<li><NavLink to='/signUp'>Sign up</NavLink></li>*/ } 
       <li><NavLink to='/signin'>Login</NavLink></li>
       <li><NavLink to='/signup'>New SignUp</NavLink></li>
       
      </ul>
    </div>
  )
}

export default SignedOutLinks