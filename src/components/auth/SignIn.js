import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  /*state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  render() {
    const { authError, auth } = this.props;

    if (auth.uid) return <Redirect to='/dash' />
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h6 className="grey-text text-darken-3"> Verify yourself with Gmail </h6>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Click to Verify</button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
          {/* <h6 className="grey-text text-darken-3">  New User </h6>         <div className="input-field">
            <button className="btn green lighten-1 z-depth-0" onClick={ <Redirect to='/signup' /> }>Sign Up</button>
            <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
    </div> 
          </div>*/}
        </form>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch(signIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
