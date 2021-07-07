import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { editProject } from '../../store/actions/editNoticeAction'
import moment from 'moment'

class EditNotice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
    }
  }

  handleChange = (e) => {
    console.log(this.state.project)
    this.setState({
      [e.target.id]: e.target.value
    })

  }
  handleChange1 = (e) => {
    e.preventDefault();
    const cid = [e.target.id]
    //this.props.editProject(this.state);
    console.log(this.state)
  }
 
  handlecheckbox = (e) => {
    console.log(this.state.displayon)
             if(e.target.checked){
             
              this.setState({ displayon:true })
            }
             else{ this.setState({ displayon:false });
             }
            }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editProject(this.state);
    this.props.history.push('/');
  }
  render() {
    //if (!auth.uid) return <Redirect to='/signin' /> 
    //if (project) {xx
    return (
      <div className="container section project-editing">
        <h5>Edit Notice</h5>
        <form className="white" onSubmit={this.handleSubmit}>
                <div className="card z-depth-0">
                        <div className="card-content">
                          <span >  {this.props.project.dept} </span>     </div>
                        {console.log(this.props.project)}
                        {console.log(this.state.project)}
                        <div className="input-field ">
                          <input type="text" id='title' defaultValue={this.props.project.title} onChange={this.handleChange} />
                          <label className='active' htmlFor="title">Title</label>
                        </div>
                        <div className="input-field  ">
                          <div>
                            <label htmlFor="Body1">Description para-1</label>
                            <textarea id="Body1" className="materialize-textarea" defaultValue={this.props.project.Body1} onChange={this.handleChange}></textarea>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="Body2">Description para-2</label>
                          <textarea id="Body2" className="materialize-textarea" defaultValue={this.props.project.Body2} onChange={this.handleChange}></textarea>
                        </div>

                        <div>
                          <label htmlFor="Body3">Description para-3</label>
                          <textarea id="Body3" className="materialize-textarea" defaultValue={this.props.project.Body3} onChange={this.handleChange}></textarea>
                        </div>
                        <p> <label>
                           <input id="displayon" type="checkbox"  className='filled-in' onChange={this.handlecheckbox} />
                           <span>Display On</span>
                            </label></p>      
                      
                                       
                      <div className="input-field">
                        <button className="btn pink lighten-1">Submit</button>
                      </div>
                      
                </div>
        </form>

      </div >
    )
  }
  //}
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.notice;
  const project = projects ? projects[id] : null
  return {
    docid: id,
    project: project,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    editProject: (project) => dispatch(EditNotice(project))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'notice'
  }])
)(EditNotice)
