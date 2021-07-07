import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const noticeSummary
 = ({ project4 }) => {
   let link=""
   console.log(project4)
  if(project4.furl){  link=<img className="materialboxed" width="50" src={project4.furl}/>}
  return (
    <div className="card">
      
        <div >
       
          <div>  <i class="tiny material-icons">call</i>
          <span className="white-text"><b>s</b></span>
            <span className="black-text"><b>{project4.firm}</b></span>
            <span className="white-text"><b>s</b></span>
          <Link to={'/edit/' + project4.id} ><i class="tiny material-icons">info_outline</i></Link> 
          <span className="white-text"><b>s</b></span>
          <Link to={'/project/' + project4.id} ><i class="tiny material-icons">info</i></Link>
           </div>
        { /* <div><span className="black-text">{project4.title}</span></div>
         {link}
          <div><span className="white-text">{project4.Body1}</span></div>
          <div><span className="white-text">{project4.Body2}</span></div>
  <div><span className="white-text">{project4.Body3}</span></div>*/}
        
      </div>
    </div>
  )

}

export default noticeSummary

