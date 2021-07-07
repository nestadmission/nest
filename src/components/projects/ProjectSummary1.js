import React from 'react'
import moment from 'moment'

const ProjectSummary1 = ({ project4 }) => {

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card-panel teal">
          <span className="white-text">Name:<span className="yellow-text">{project4.name}</span></span>
          <div><span className="white-text">Speciality-{project4.sp}</span></div>
          <div><span className="white-text">{project4.visitHr}</span></div>
          <div><span className="white-text">{project4.visitday}</span></div>
        </div>
      </div>
    </div>
  )

}

export default ProjectSummary1
