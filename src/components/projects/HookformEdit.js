import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { useDispatch } from 'react-redux'
import { createProject } from '../../store/actions/noticeActions'
import Spinner from './Spinner';
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import M from "materialize-css";


const CreateNotice1 = React.forwardRef(({ project, id, auth }, ref) => {
  /*
   const { handleSubmit, formState: { errors }, setValue } = useForm({
     defaultValues: {
       FirstName: id !== 'a' ? project.FirstName : '',
       Address1: id !== 'a' ? project.Address1 : '',
       Address0: id !== 'a' ? project.Address0 : '',
       Address2: id !== 'a' ? project.Address2 : '',
       Bdate: id !== 'a' ? project.Bdate : '',
       Mobile: id !== 'a' ? project.Mobile : '',
       Bplace: id !== 'a' ? project.Bplace : '',
       Domicile: id !== 'a' ? project.Domicile : '',
       Domicile_dt: id !== 'a' ? project.Domicile_dt : '',
       Category: id !== 'a' ? project.Category : '',
       furl: id !== 'a' ? project.furl : '-',
       course: id !== 'a' ? project.course : '',
       payment: id !== 'a' ? project.payment : '',
       Education: id !== 'a' ? project.Education : '',
       Marital: id !== 'a' ? project.Marital : '',
       Employee: id !== 'a' ? project.Employee : '',
       Tot_exp_year: id !== 'a' ? project.Tot_exp_year : '',
       page: id !== 'a' ? project.page : '0',
       uploadProgress: 0,
       id1: id
 
     }
   }
   
   )*/
  console.log('Auth', auth)
  let history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  const options = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ]

  const dispatch = useDispatch();

  const onSubmit = data => {

    //dispatch(createProject(data))
    //history.push('/edit/' + auth.uid);
  }
  console.log('ddfdff');

  useEffect(() => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
    var elems1 = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems1, {});
  }, []);
  if (project) {
    return (
      <div className='container' ref={ref} >
        {/*(id !== 'a') ? <h6>Filled Application Form  </h6> : null*/}
        {(project.course === 'PDIETM' || project.course === 'PDIS') ?
          (<div class="row">
            <a href="https://paytm.me/vL-ecOQ"><button style={{ height: "40px" }} > <b>Proceed for payment</b></button></a>
          </div>
          ) : (<div class="row">            
                  <a href="https://paytm.me/33a-huZ"><button style={{ height: "40px" }} > <b>Proceed for payment</b></button></a>
                </div>    )
  }
        <h6 > Read the following instructions. Then click on the payment button to pay form fee.</h6>
        <p>1. If the fee is received then the form will be considered valid</p>
        <p>2.  You will get receipt through email within 24 hours after successful payment.
        </p> 3.  Take printout of receipt.<u> Send  documents(self attested copy) and receipt to following address</u>
        <p><b>NEST, GNFC Training Center, Narmada Nagar,Bharuch-392015</b> </p>
        <p> For any help for online Application process please contact 9974021397 or
          <a href="https://wa.me/919974021397"> click here for whatsapp help </a></p>

        <div >


        </div>
      
  <div style={{ textAlign: "left" }}>
    <div style={{ textAlign: "center", border: '2px solid black', margin: '2' }}>
      <h6 >Narmada Education and Scientific Research Society</h6>
      <span>www.nest.org.in    GNFC Training Center, Narmada Nagar,Bharuch-392015</span>
      <h6 ><u>APPLICATION FOR ADMISSION</u></h6>
    </div>
    <div className='row'>
      <div className='col s9 '>
        <span><b>2021-22/{auth.email}</b></span>
        <p>Applied for :{project.course}</p>
        <p>Name        : {project.FirstName}</p>
        <p>Mobile      : {project.Mobile}</p>
        <p>Category(cast): {project.Category}</p>
        <p>Birth date  : {project.Bdate}</p>
        <p>Birth Place : {project.Bplace},{project.Domicile}</p>
        <p>Education   : {project.Education} -{project.Edu_taka} %</p>
        <p>University  : {project.University}</p>
        <p>Experience  : {project.Tot_exp_year}</p>
        <p> Address.: {project.Address1}</p>
        {(project.Address0 === '2') ? <p> Address-2: {project.Address2}</p> : null}
        <p></p>
      </div>

      <div className='col s3 '>
        {id !== 'a' ? <img className="materialboxed" width="100%" src={project.furl} /> : '-'}
        {isLoaded && < Spinner />}
      </div>
    </div>
    <div class="divider"></div>

    <h6> Attached following documents (self attested copy).</h6>
    <div className='row'>
      <div className='col s6 '>
        <p>Birth Certificate or LC or Authentic cert. to verify birth date and place</p>
        <p>Final Exam Mark sheet</p>
        {(project.Employee === 'Employee') ? <p> NOC  from present employer <b><u> (original)</u></b></p> : null}
        {(project.Category === 'SC' || project.Category === 'ST' || project.Category === 'SEBC') ? <p>Cast Certificate </p> : null}

      </div>
      <div className='col s6' >
        {(project.Category === 'SEBC') ? <p>Creamy layer Certificate of current financal year </p> : null}
        {(project.Category === 'EWS') ? <p> EWS-Certificate </p> : null}
        {(project.Domicile === 'Outside') ? <p>Domicile Certificat .</p> : null}
        {(project.Tot_exp_year !== '0' || project.Education === 'Diploma' || project.Education === 'BSc') ? <p>Experience Certificates(past and present) </p> : null}
      </div>


    </div>
    <div class="divider"></div>
    <p> <b>DECLARATION: </b>I {project.FirstName} hearby declare that all statements made in the online application are true, complete and correct to the best of my knowledge and belief and in the event of any information being found false or incorrect or any ineligibility being detected before or after the test my candidature is is liable to be canceled and legal action may be initiated against me.</p>
    <div className='row'>
      <div className='col s4'>
          <p>Applicant's Sign.</p>
         
        
      </div>
    </div>


    <div className='row'>
      <div style={{ textAlign: "center", border: '5px solid black', margin: '5' }}>
        <h6>For office use only</h6>
      </div>
      <div className='col s6'>
        <div style={{ textAlign: "center", border: '3px solid black', margin: '5' }}>
          
          <h6>Eligible/Non eligible</h6>
          
        </div>
      </div>
      <div className='col s6'>
        <div style={{ textAlign: "center", border: '3px solid black', margin: '5' }}>
          <h6>Sign. of Corse Coordinator</h6>
                   <p></p>
        </div>
      </div>
    </div>
    <div className='row'>

      <div className='col s3'>
        <div style={{ textAlign: "center", border: '3px solid black', margin: '5' }}>
          <h6>Qualification (subject)</h6>
          <br />
          
        </div>
      </div>

      <div className='col s3'>
        <div style={{ textAlign: "center", border: '3px solid black', margin: '5' }}>
          <h6>% Marks</h6>
          <br />
          <br />
        </div>
      </div>
      <div className='col s3'>
        <div style={{ textAlign: "center", border: '3px solid black', margin: '5' }}>
          <h6>Category</h6>
          <br />
          <br />
        </div>
      </div>
      <div className='col s3'>
        <div style={{ textAlign: "center", border: '3px solid black', margin: '5' }}>
          <h6>Experience</h6>
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
       

      </div >


    )
  } else {
  return (
    <div className="container center">
      <p>Loading data...</p>
    </div>
  )
}

})
//const Hookform = connect()(CreateNotice);
//export default Hookform;
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
  firestoreConnect((props) => [{
    collection: 'notice', where: [['uid', '==', props.auth.uid]]
  }])
)(CreateNotice1)
