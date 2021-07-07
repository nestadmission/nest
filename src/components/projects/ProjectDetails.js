import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ProjectDetails = (props) => {

  const { project, auth } = props;
  console.log(project)
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (project) {
    return (  
      <div>  
      <div className="row">
    <div className="col s12 m7">
      <div className="card">
        <div className="card-image">
          <img  height='250px' src={project.furl}/>
          <span className="card-title"><b>{project.firm}</b></span>
        </div>
        <div className="card-content">
          <p>{project.address}</p>
         <p>{project.owner}</p>          
         <p> {project.products}</p>
          {project.brands}
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
  </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  const projects = state.firestore.data.notice;
  const project = projects ? projects[id] : null

  return {
    project: project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'notice'
  }])
)(ProjectDetails)
