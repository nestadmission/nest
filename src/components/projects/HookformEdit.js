import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { useDispatch } from 'react-redux'
import { createProject } from '../../store/actions/noticeActions'
import Spinner from './Spinner';
import { useHistory } from 'react-router-dom'
import M from "materialize-css";


const CreateNotice1 = React.forwardRef(({ project, id, auth }, ref) => {
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
  })
  console.log('Auth', auth)
  let history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  const options = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ]

  const dispatch = useDispatch();

  const onSubmit = data => {
    setValue("project.furl", '123')
    console.log('my data auth', auth)
    alert('Saving')
    dispatch(createProject(data))
    history.push('/edit/' + auth.uid);
  }
  console.log(errors, 'ddfdff');

  useEffect(() => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
    var elems1 = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems1, {});
  }, []);

  return (
    <div className='container' ref={ref} >
      {/*(id !== 'a') ? <h5>Filled Application Form  </h5> : null*/}
     <h6 > Read the following instructions. Then click on the payment button (at Bottom) to pay form fee.</h6>
     <p>1. If the fee is received then the form will be considered valid</p>
     <p> 2.  Have the documents ready as listed below.</p>
    
      <div style={{ color: 'blue',marginLeft:'25px' }}>
        <p>Birth Certificate or LC or Authentic cert. to verify birth date and place</p>
        <p>Final Exam Mark sheet</p>
        {(project.Education === 'Diploma') ? <p>Std 10th  Mark sheet</p> : <p> Std 12th Mark sheet</p>}
        {(project.Employee === 'Employee') ? <p> NOC  from present employer </p> : null}
        {(project.Category === 'SC' || project.Category === 'ST') ? <p>cast Certificate </p> : null}
        {(project.Category === 'SEBC') ? <p>Creamy layer Certificate of current financal year </p> : null}

        {(project.Category === 'EWS') ? <p> EWS-Certificate </p> : null}
        {(project.Domicile === 'Outside') ? <p>Domicile Certificat .</p> : null}
        {(project.Tot_exp_year !== '0'|| project.Education === 'Diploma' ||project.Education === 'BSc') ? <p>Experience Certificates(past and present) </p> : null}
      </div>  
    <p>2.  You will get receipt through email within 24 hours after successful payment.
      </p> <br/> 3.  Take printout of receipt.
      <br/>
       <b><u>Send  documents(self attested copy) and receipt to following address</u> </b> 
     <p> GNFC Training Center, Narmada Nagar,Bharuch-392015</p>
     <p> For any help for online Application process please contact 9974021397 or  
     <a href="https://wa.me/919974021397"> click here for whatsapp help </a></p>
     
<div >


</div>
<div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text" style={{ textAlign: "center" }} >
          <span class="card-title">Payment</span>
          
        <div class="card-action">
          <a href="https://paytm.me/l-URvfU"><button style={{ height: "40px" }} > <b>Proceed for payment</b></button></a>
          
        </div>
      </div>
    </div>
  </div>
  </div>
  

      <form style={{ background: 'silver', textAlign: "left" }} onSubmit={handleSubmit(onSubmit)}>
      <div style={{ textAlign: "center",border: '5px solid black',margin:'5'}}>
      <h4 >Narmada Education and Scientific Research Society</h4>
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
            <p>Education   : {project.Education}</p>
            <p>Experience  : {project.Tot_exp_year}</p>
             <p> Address.: {project.Address1}</p>
            {(project.Address0==='2')?<p> Address-2: {project.Address2}</p>:null}
            <p></p>
          </div>
          <div className='col s3 '>
            {id !== 'a' ? <img className="materialboxed" width="100%" src={project.furl} /> : '-'}
            {isLoaded && < Spinner />}
          </div>
        </div>
        <div>
        </div>
      </form>
      
    </div >)

})
//const Hookform = connect()(CreateNotice);
//export default Hookform;
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, '1213', state)
  let id = null
  if (ownProps.match.params.id) { id = ownProps.match.params.id }
  const projects = state.firestore.data.notice;
  const project = projects ? projects[id] : '--'
  // console.log(project, id)
  return {
    project: project,
    auth: state.firebase.auth,
    id: id
  }
}

export default connect(mapStateToProps)(CreateNotice1)
