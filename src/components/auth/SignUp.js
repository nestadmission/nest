import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { auth } from 'firebase'

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.profile.firstName,
      mobile: this.props.profile.mobile

    }
  }




  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    this.props.signUp(this.state);
    this.props.history.push('/');
  }
  componentDidMount(){
    console.log(this.props.profile)
  }

  render() {
    const { auth, authError } = this.props;
    // if (auth.uid) return <Redirect to='/' /> 
    console.log(this.props.profile)
    if (this.props.profile.isLoaded) { 
      console.log(this.props)
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Profile</h5>
          { /* <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
    </div>*/}
          <div className="input-field">
            <label class="active"  htmlFor="firstName" >Name</label>
            <input type="text" id='firstName' defaultValue={this.props.auth.displayName} onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Mobile</label>
            <input type="text" id='mobile' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Save Profile</button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    )}else {
      return <p>Doownloading....</p>
    }

  }
}

const mapStateToProps = (state) => {
  return {
    //data should be read from user collection todo
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
