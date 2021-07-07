import React, { useEffect, useState } from 'react'
import firebase from "firebase";
import { useForm,Controller } from "react-hook-form";
import Select from 'react-select'
//import { connect } from 'react-redux'
import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
import FileUploader from "react-firebase-file-uploader";
import imageCompression from 'browser-image-compression';
import { createProject } from '../../store/actions/noticeActions'
import Spinner from './Spinner';
import { Redirect, useHistory } from 'react-router-dom'
import M from "materialize-css";

const CreateNotice1 = ({ project, id, auth }) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      FirstName: id !== 'a' ? project.FirstName : '',
      Address1: id !== 'a' ? project.Address1 : '',
      Address0: id !== 'a' ? project.Address0 : '',
      Address2: id !== 'a' ? project.Address2 : '',
      Bdate: id !== 'a' ? project.Bdate : '',
      Mobile: id !== 'a' ? project.Mobile : '',
      Domicile: id !== 'a' ? project.Domicile : '',
      Domicile_dt: id !== 'a' ? project.Domicile_dt : '',
      Category: id !== 'a' ? project.Category : '',
      furl: id !== 'a' ? project.furl : '',
      course: id !== 'a' ? project.course : '',
      payment: id !== 'a' ? project.payment : '',
      Education: id !== 'a' ? project.Education : '',
      Marital: id !== 'a' ? project.Marital : '',
      Employee: id !== 'a' ? project.Employee : '',
      Tot_exp_year :id !== 'a' ? project.Tot_exp_year:'',
      page: id !== 'a' ? project.page : '0',
      uploadProgress: 0,
      id1: id

    }
  })
  console.log('Auth', auth)
  let history = useHistory();
  const watchCourse = watch("course", false);
  const watchAddress = watch("Address0", false);
  const watchDomicile = watch("Domicile", false)
  const watchCategory = watch("Category", false)
  const watchEducation = watch("Education", false)
  const watchPage = watch('page', false)
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
    // dispatch(createProject(data))
    history.push('/create/b');

    //this.props.history.push('/');


  }
  console.log(errors);

  useEffect(() => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
    var elems1 = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems1, {});


  }, []);

  // upload--------
  const handleUploadStart = () => {
    console.log('started')

  }

  const handleUploadError = error => {

    console.error(error);
  };
  const handleUploadSuccess = async filename => {
    console.log(filename)
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

  //upload over
  function closeMe() {
    alert('dfdsfsdfgdsg')
    window.open('', '_parent', '');
    window.close();
  }
  //resize and then upload
  function handleImageUpload(event) {
    console.log('handleImageUpload(event)', event.target.files[0])
    setIsLoaded(true)
    var imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    var options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    imageCompression(imageFile, options)
      .then(function (compressedFile) {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        //const file = input.files[0];
        const url = URL.createObjectURL(compressedFile);
        console.log(url)
        return compressedFile; // write your own logic

      }).then((url) => {
        console.log('message', url);
        let file = url;
        let storageRef = firebase.storage().ref(`${'image'}/${file.name + "2"}`);
        let uploadTask = storageRef.put(file);
        // ----------------------------
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;


          }
        }, (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          // eslint-disable-next-line default-case
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setValue("furl", downloadURL)


            console.log('File available at', downloadURL,);
            setIsLoaded(false)
          });
        }
        );



        //----------------------

      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const aa = () => {
    console.log('fsdfsdfs')
    return <Redirect to='/sigin' />
  }
  // if (auth) return <Redirect to='/sigin' />

  return (
    <div className='container'>
      {(id !== 'a') ? <h5>Saved form (View only) </h5> : null}


      <form onSubmit={handleSubmit(onSubmit)}>
        {id !== 'a' ? <img className="materialboxed" width="200" src={project.furl} /> : '-'}
        {isLoaded && < Spinner />}
        <div style={{ "background": 'Teal' }}>
        
          <div className='container'>
            <h5 style={{ color: 'white' }} > Select Course</h5>
          </div>
          <select {...register("course", { required: true })}>
            <option value="DIS"> Industrial Safety (Pay Rs. 300)</option>
            <option value="DET"> Indust. Enviromental Tec. & Mgt(Pay Rs. 300) </option>
            <option value="DIS/DET">BOTH(Pay Rs. 600) </option>
          </select>
          {watchCourse === "DIS/DET" && <h6>Maximum one admission as per merit</h6>}
          {watchCourse && <input type="text" placeholder="   Payment ID,Date" {...register("payment", { required: true, maxLength: 300 })} />
          }
        { /* <div className='row'>
            <div className='col s10'></div>
            <div className='col s2'>
              <button type="button" onClick={() => (setValue('page', '1'))}>NEXT</button>
            </div>
        </div>*/}
        </div>

        <div >
          <input type="text" placeholder="Surname First name Last Name" {...register("FirstName", { required: true, maxLength: 80 })} />
          <textarea type="text" placeholder="Present Address" {...register("Address1", { required: true })} />

          <div class="row">
            <div class="col s9"><h6>Permanent address is same as above ?</h6></div>

            <div class="col s3">
              <select {...register("Address0", { required: true })} >

                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
            </div>
            {errors.Address0 && errors.Address0.type === "required" && <span style={{ background: 'red' }}>Please select YES or NO</span>}
          </div>
          {watchAddress === '2' && <textarea type="text" placeholder="Permanent address"  {...register("address2", { required: true, maxLength: 300 })} />}


          <input type="tel" placeholder="Mobile number-(10 digit)" {...register("Mobile", { required: true, minLength: 10, maxLength: 10 })} />
          {errors.Mobile && errors.Mobile.type === "required" && <span style={{ background: 'red' }}>ple.. enter 10 digit Mobile no.</span>}
          {errors.Mobile && errors.Mobile.type === "minLength" && <span style={{ background: 'red' }}>lessthen 10 digit.</span>}
          {errors.Mobile && errors.Mobile.type === "maxLength" && <span style={{ background: 'red' }}>more then 10 digit.</span>}
          <div className="row">
            <div className="col s6">
              Birth Date
            </div>
            <div className="col s6">
              <input type="date" placeholder="Birthdate" {...register("Bdate", { required: true })} />
              {errors.Bdate && errors.Bdate.type === "required" && <span style={{ background: 'red' }}>ple.. enter birth date</span>}
            </div>
          </div>
          <div class="row">
            <div class="col s6"><h6>Birthplace ?</h6></div>

            <div class="col s6">
              <select {...register("Domicile", { required: true })} >

                <option value="Gujarat">Within Gujarat</option>
                <option value="Outside">Outside Gujarat</option>
              </select>
            </div>
            {errors.Domicile && errors.Domicile.type === "required" && <span style={{ background: 'red' }}>Please select birth place</span>}
          </div>

          {watchDomicile === 'Outside' && 
          (<div className='row' style={{ color: 'red' }} >
          <b>You must have a Domicile Certificate </b>
           </div>)
          }


          <div class="row">
            <div class="col s6"><h6>Select Category (cast)?</h6></div>

            <div class="col s6">
              <select {...register("Category", { required: true })} >

                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="SEBC">SEBC</option>
                <option value="EWS">EWS</option>
                <option value="OPEN">OPEN</option>
              </select>
            </div>
            {errors.Category && errors.Category.type === "required" && <span style={{ background: 'red' }}>Sselect cast category</span>}
          </div>

          {(watchCategory === 'SEBC' || watchCategory === 'EWS') &&
          (<div className='row' style={{ color: 'red' }} >
          <b>You must have  Certificate </b>
           </div>)
          }
          {(watchCategory === 'SC' || watchCategory === 'ST') && 
          (
            (<div className='row' style={{ color: 'red' }} >
            <b>You must have a Creamy Layer Certificate </b>
             </div>
          ) 
          )
          }

          <div class="row">
            <div class="col s9"><h6>Select Qualification(Topmost)?</h6></div>

            <div class="col s3">
              <select {...register("Education", { required: true })} >

                <option value="Diploma">Diploma </option>
                <option value="BSc">B.Sc</option>
                <option value="MSc">M.Sc</option>
                <option value="BE">BE/BTech</option>
                <option value="ME">ME/MS</option>
              </select>
            </div>
            {errors.Education && errors.Education.type === "required" && <span style={{ background: 'red' }}>Sselect topmost Education</span>}
          </div>
          {(watchEducation === 'Diploma' || watchEducation === 'BSc' ) &&
            (<div className='row' style={{ color: 'red' }} >
              <b>You must have at least two years of experience (Excluding training) </b>
               </div>
            )}
<div class="row">
            <div class="col s9"><h6>Marital status</h6></div>

            <div class="col s3">
              <select {...register("Marital", { required: true })} >

                <option value="Marrid">Marrid</option>
                <option value="Unmarried">Unmarried</option>
              </select>
            </div>
            {errors.Marital && errors.Marital.type === "required" && <span style={{ background: 'red' }}>Please select status</span>}
          </div>
<div className='row'>
          <div class="col s9">Are you a current employee of any organization?</div>

<div class="col s3">
  <select {...register("Employee", { required: true })} >

    <option value="Employee">Yes</option>
    <option value="Unemployed">No</option>
  </select>
</div>
{errors.Employee && errors.Employee.type === "required" && <span style={{ background: 'red' }}>Please select status</span>}
</div>



          <div className='row'>
            <div className="col s6">
              Total working experience (Excluding training)
            </div>
            <div className="col s6">
              <select {...register("Tot_exp_year", { required: true })} >

                <option value="0">0 </option>
                <option value="0-2"> Lessthen two years</option>
                <option value="2-4"> Two to four years</option>
                <option value="5<">Morethen four years</option>
                <option value="10<">More then ten years</option>
              </select>

            </div>
          </div>
          
          {id === 'a' ? <h5>Passport style Photo</h5> : null}
          {id === 'a' ? <input type="file" accept="image/*" onChange={handleImageUpload} /> : null}
          {isLoaded && < Spinner />}
          {id === 'a' ? <input type="text" hidden placeholder="Image Url" {...register("furl", { required: true })} /> : null}
          {errors.furl && errors.furl.type === "required" && <span style={{ background: 'red' }}>Please upload face pic.</span>}



          {/*  <div className="container uploading">
          <h5>Passport style Photo</h5>
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            handleImageUpload
            storageRef={firebase.storage().ref("images")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
</div>*/}
        { /* <div className='row'>
            <div className='col s10'>
              <button type="button" onClick={() => (setValue('page', '0'))}>PREVIOUS</button>
            </div>
            <div className='col s2'>
              <button type="button" onClick={() => (setValue('page', '2'))}>NEXT</button>
            </div>
</div>*/}


        </div>
        <div>

          {(id !== 'a') ? null : <input type="submit" />}
        </div>
      </form>

    </div >)

}
//const Hookform = connect()(CreateNotice);
//export default Hookform;
const mapStateToProps = (state, ownProps) => {
  console.log()
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
