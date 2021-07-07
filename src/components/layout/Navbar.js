import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import M from "materialize-css";
import { NavLink } from 'react-router-dom'
const Navbar = (props) => {
  const { auth, profile } = props;
  console.log(auth.displayName, '1')
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
  useEffect(() => {
    // Update the document title using the browser API

    var sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav, {});
  }, []);


  return (
    <nav>
      <div className="nav-wrapper">
        < NavLink to='/view' className="brand-logo right ">NEST Admission Portal</NavLink>

        < NavLink to='/view' className="brand ">{auth.displayName}</NavLink>
        {/*
        <ul
          ref={(Sidenav) => {
            Sidenav = Sidenav;
          }}
          id="slide-out"
          className="sidenav sidenav-close"
        >
          <li><a>Second Link</a></li>

          <li>
            <div className="divider" />
          </li>

          <li>
            <a className="subheader">Subheader</a>

          </li>


          {links}
          <li><a><button>Close</button></a></li>
        </ul>

        <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-large">
          <i className="material-icons">menu</i>
        </a>*/}

      </div>



    </nav>
  )
}

const mapStateToProps = (state) => {
  console.log('app-1', state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)
