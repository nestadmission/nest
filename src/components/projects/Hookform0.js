import React, { useEffect, useState } from 'react'
import firebase from "firebase";
import { useForm } from "react-hook-form";
//import { connect } from 'react-redux'
import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
import FileUploader from "react-firebase-file-uploader";
import { createProject } from '../../store/actions/noticeActions'
import { Redirect } from 'react-router-dom'
import M from "materialize-css";

const CreateNotice1 = ({ project, id,auth }) => {
  console.log(project, id)
  
let {aa}=project.owner
  useEffect(() => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
    var elems1 = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems1, {});
     
  }, []);


  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      course:'1',
      furl: id !== 'a' ? project.furl : '',
      firm: id !== 'a' ? project.firm : '',
      owner: id !== 'a' ? project.owner : '',
      address: id !== 'a' ? project.address : '',
      phone: id !== 'a' ? project.phone : '',
      brands:id !== 'a'? project.brands:'',
      products :id !== 'a'? project.products:'',
      otherdetail:id !== 'a'? project.otherdetail:'',
      uploadProgress: 0,
      id1: id
    }
  })
  const dispatch = useDispatch();
  const onSubmit = data => {

    console.log(data)
    alert('p')
 // dispatch(createProject(data))
  }
  const myFunction = (e) => {
    const { value } = e.target;
    console.log('upload files ddd')

  }
  // function 
  const handleUploadStart1 = (e) => {
    /* const storageRef=firebase.storage().ref("images");
     const fileRef=storageRef.child(e.image[0].name);
     fileRef.put(e.image[0] ).then(()=>{
       const downloadUrl =  fileRef.getDownloadURL()
       setfurl(downloadUrl);
       console.log('ok',downloadUrl) 
       
     }).catch(err => {
      console.log('not ok')
     })
     alert('start')
      
   console.log('started',)*/

  }

  // funk for uploading library
  const handleUploadStart = () => {
    console.log('started')

  }

  const handleUploadError = error => {

    console.error(error);
  };
  const handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL().then((url) => {
        setValue("furl", url)
        console.log(url, 'url')
      });
    console.log(filename)
  };
  const handleProgress = progress => {
    setValue('uploadProgress', progress)
    console.log(progress)
      ;
  }
  const deletefile = (e) => {
    e.preventDefault();
    var fileRef = firebase.storage().refFromURL(project.furl);
    fileRef.delete().then(function () {

      // File deleted successfully 
      console.log("File Deleted")
    }).catch(function (error) {
      // Some Error occurred 
    });
    console.log('delete file sucessfully')
  }
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (project){
  return ( 
  
    <div className="container">
      
     
      <form>
        <div className="row">
        <div className="col s12 m12">
        <select name='course' ref={register}>
        <option value="1">Safety</option>
        <option value="2">Enviroent</option>
        <option value="12">Both</option>
      </select>      
</div>
<div>sanjay-
  {aa}

</div>

           <div className="col s12 m12">
            Firm Name:
            <div class="input-field inline">
            <input name="firm" ref={register({ required: true, maxLength: 80 })} />
           
   
            </div>  
            </div>
            
            <div className="col s12 m12">
            Owner:
            <div class="input-field inline">
            <input name="owner" ref={register({ required: true })} />
            </div>  
            </div>
            
            <div className="col s12 m12">
            Address:
            <div class="input-field inline">
            <input name="address" ref={register({ required: true })} />
            </div>  
            </div>


             <div className="col s12">Phone No
              <div className="input-field inline ">
              <input name="phone" type="number" ref={register({ required: true, minLength: 10 })} />
             </div>  
             </div> 
             </div>
             <div className="col s12 m12">
            Brands:
            <div class="input-field inline">
            <input name="brands" ref={register({ required: true })} />
            </div>  
            </div> <div className="col s12 m12">
            Products:
            <div class="input-field inline">
            <input name="products" ref={register({ required: true })} />
            </div>  
            </div>
            <div className="col s12 m12">
            Other Details:
            <div class="input-field inline">
            <input name="otherdetail" ref={register({ required: true })} />
            </div>  
            </div>


             
             <div className="col s12">Shop/contractor/tech
              <div className="input-field inline ">
              <input name="catagery" type="number" ref={register({ required: true, minLength: 3 })} />
             </div>  
             </div> 
             
            
             






       
        {id !== 'a' ? <img className="materialboxed" width="50" src={project.furl} /> : '-'}
        <input name='furl' type='text' ref={register} />
        <p>file Uploader</p>
        <input name='id1' style={{ display: 'none' }} type='text' ref={register} />
        <p>file Uploader</p>
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
        />
        <p><input name='uploadProgress' defalt type='text' ref={register} /></p>
        <p>Progress: {100}</p>
        <button onClick={deletefile}>delete file</button>
        <button onClick={handleSubmit(onSubmit)} >Submit</button>
      </form>
    </div>

  )}else{return <p>Wait</p>}
}
//const Hookform = connect()(CreateNotice);
//export default Hookform;
const mapStateToProps = (state, ownProps) => {
  //console.log(ownProps.match.params.id)
  let id = null
  if (ownProps.match.params.id) { id = ownProps.match.params.id }
  const projects = state.firestore.data.notice;
  const project = projects ? projects[id] : '--'
  console.log(project, id)
  return {
    project: project,
    auth: state.firebase.auth,
    id: id
  }
}

export default connect(mapStateToProps)(CreateNotice1)
