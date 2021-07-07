import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/noticeActions'
import { Redirect } from 'react-router-dom'
class CreateProject extends Component {
  state = {
    dept: '',
    title: '',
    Body1: '',
    Body2: '',
    Body3: '',
    displayon: true
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(e.target.value)
  }
  componentDidMount() {


  }
  handlecheckbox = (e) => {
    console.log(this.state.displayon)
    if (e.target.checked) {

      this.setState({ displayon: true })
    }
    else {
      this.setState({ displayon: false });
    }
    console.log(this.state.displayon)
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push('/');
    // window.open("http://wa.me/91" + this.state.mobile + "?text=Hi "+this.state.name+", Thank you for choosing us to take care of your "+this.state.modelno+" Your Repair id is "+this.state.mobile +". For any query please contact us on: 9898421074");
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">New Notice </h5>
          <div className="input-field">
            <input type="text" id='dept' onChange={this.handleChange} />
            <label className="grey-text text-darken-3" htmlFor="dept">Department</label>
          </div>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Title</label>
          </div>
          <div ><label htmlFor="Body1">Description para-1</label>
            <textarea id="Body1" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div ><label htmlFor="Body2">Description para-2</label>
            <textarea id="Body2" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div ><label htmlFor="Body3">Description para-3</label>
            <textarea id="Body3" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <p> <label>
            <input id="displayon" type="checkbox" className='filled-in' onChange={this.handlecheckbox} />
            <span>Display On</span>
          </label></p>
          <div>
          </div>
          <div className="input-field">
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
