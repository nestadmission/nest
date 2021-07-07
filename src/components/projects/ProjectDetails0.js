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


      
      <div className="container section project-details">
     
      

        <div className="card z-depth-0">  
        <h5 margin='0' >{project.firm}</h5>
      <img className="responsive-img" src={project.furl}/>
          <div className="card-content">
           
             
          
            <p>{project.phonr}</p>
            <p>{project.address}</p>s
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
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
