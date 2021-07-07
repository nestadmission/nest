import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  console.log(props)
  return (
    <div>

      <li><NavLink to='/create'>Create Notice-n.w. </NavLink></li>
      <li><NavLink to='/view'>View </NavLink></li>
      {/*
        <li><NavLink to='/create/:id'>Create Notice with ID </NavLink></li>
        <li><NavLink to='/media/:id'>Create Notice </NavLink></li>
     <li><NavLink to='/edit/:id'>Create Notice </NavLink></li>

      <li><a onClick={props.signOut}>Sign Out</a></li>
       <li><NavLink to='/' className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>*/}

    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
