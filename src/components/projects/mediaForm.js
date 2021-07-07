import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { generateMedia } from '../../store/actions/mediaActions'
import { Redirect } from 'react-router-dom'
import firebase from "firebase";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import FileUploader from "react-firebase-file-uploader";
class CreateNotice extends Component {
  state = {
    title: this.props.project ? this.props.project.title : '',
    description: this.props.project ? this.props.project.description : '',
    youtubeID: this.props.project ? this.props.project.youtubeID : '',
    docid: this.props.id ? this.props.id : null,
    startDate: new Date(),
    endDate: new Date(),
    //followings are for futre use
    filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0,
    files: []
  }
  handleDate = date => {
    this.setState({
      startDate: date
    });
  };
  handleDate_end = date => {
    this.setState({
      endDate: date
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    //console.log(e.target.value)
  }
  handlecheckbox = (e) => {
    //console.log(this.state.displayon)
    if (e.target.checked) {
      this.setState({ displayon: true })
    }
    else {
      this.setState({ displayon: false });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    //this.props.generateMedia(this.state);
    console.log(this.state)
    this.props.history.push('/');
  }
  handleUploadStart = () => {
    console.log('started')
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });
  }
  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });
  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };
  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();
    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
    console.log(this.state.downloadURLs)
  };
  back = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  //code added for manual uploading
  customOnChangeHandler = (event) => {

    // const { target: { files } } = event;
    var files = event.target.files;
    const filesToStore = [];
    console.log(files)
    // files.forEach(file => filesToStore.push(file));
    files.forEach(file => console.log(file));
    this.setState({ files: filesToStore });
    /*
   var files = event.target.files;
  // https://developer.mozilla.org/en-US/docs/Web/API/FileList#item
  var firstFile = files.item(1); 
  var idstokeep = [0, 2]; // keep first `2` files from `multiple` selection
  var _files = Array.prototype.slice.call(files).splice(idstokeep[0], idstokeep[1]);
  console.log('ssss',files, files.length         
              , _files, _files.length
              , firstFile);
              */
  }

  /**
  * Start download handler using the file uploader reference
  */
  startUploadManually = () => {
    const { files } = this.state.files;
    files.forEach(file => {
      this.fileUploader.startUpload(file)
    });
  }
  //
  render() {
    console.log(this.props)
    const { auth } = this.props;
    //if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container section project-editing">

        { /*<div className="bg-img"> </div>*/}
        <form onSubmit={this.handleSubmit}>
          <div className="card z-depth-0">
            <div className="card-content" style={{ padding: '2px' }}>
            <div class="row">
        <div class="col s12">
          Title:
          <div class="input-field inline">
            <input id="email_inline" type="email" class="validate"/>
            {/*<label for="email_inline">Email</label>*/}
            <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
          </div>
        </div>
      </div>
           
            </div>

            


            {(this.props.profile.role !== 'owner1') ? <div className="input-field ">
              <input type="text" id='youtubeID' onChange={this.handleChange} />
              <label htmlFor="youtubeID">You Tube ID</label>
            </div> : null}


            {(this.props.profile.role === 'admin' || this.props.profile.role !== 'owner1') ?
              <div className='row'>
                <div className='col s6'> <h6>Display from</h6>
                  { /*<DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleDate}
                            showTimeSelect
                            dateFormat="Pp"
                         />*/}
                </div>
                <div className='col s6'>
                  <h6>Display   to</h6>
                  {/* <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleDate_end}
                            showTimeSelect
                            dateFormat="Pp"
                       />*/}
                </div>
              </div> : null}
            <h6>Title</h6>
            <div className="input-field ">
              <input type="text" defaultValue={this.state.title} id='title' onChange={this.handleChange} />

            </div>
            <div>
            </div>

            <h6>Description</h6>
            <div className="input-field ">
              <textarea id='description' defaultValue={this.state.description} style={{ height: '20rem', textAlign: 'justify', lineHeight: '1.5rem' }} onChange={this.handleChange} />

            </div>

            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              multiple
            />
            <p>Progress: {this.state.uploadProgress}</p>
            <p>manual upload</p>
            <FileUploader
              multiple
              onChange={this.customOnChangeHandler} // ⇐ Call your handler
              ref={instance => { this.fileUploader = instance; }}  // ⇐ reference the component
            />
            <button onClick={this.startUploadManually}>Upload all the things</button>
            <button type='button' >Save</button>


            {(this.props.profile.role === 'admin' || this.props.profile.role === 'owner') ?
              <button className="btn pink lighten-1">Save</button>
              : null} <button className="btn pink lighten-1" onClick={this.back}>Back</button>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps)
  let id = null
  if (ownProps.match.params.id) { id = ownProps.match.params.id }
  const projects = state.firestore.data.notice;
  const project = projects ? projects[id] : null
  console.log(project)
  return {
    project: project,
    id: id,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // generateMedia: (project) => dispatch(generateMedia(project))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNotice)
