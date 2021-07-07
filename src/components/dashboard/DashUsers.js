import React, { Component } from 'react'

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Notice from '../projects/noticeSummary'
import NoticeDats from '../projects/viewNoticeDatas'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: this.props.projects,
      showing: true,
      days: '',
      value: ''
    }
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  render() {

    const { projects, err, auth, value, profile } = this.props;
    console.log('projects', projects)
    console.log(this.props.firestore.data)
    console.log('auth', auth.email)
 /*   
if (projects){
    return <Redirect to={'/edit/' +auth.uid}/>
}else{return <Redirect to={'/create/a'}/>}
*/
    //if (!projects) return <Redirect to='/edit' />  

   if (!auth ) return <Redirect to='/signin' />
    if (projects){
        if(projects.length>0){
            return <Redirect to={'/edit/' +auth.uid}/>
        }else{
            return <Redirect to={'/create/a'}/> 
        }
}
else{
    return <h3>loading</h3>
}
    

}
}

const mapStateToProps = (state) => {

  console.log(state)
  return {
    projects: state.firestore.ordered.notice,
    auth: state.firebase.auth,
    profile: state.firebase.profile,

  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    // { collection: 'visitingDr', where: [ ['visitday', '==','Sat']  ]   }
    // { collection: 'visitingDr', where: [['visitday', 'array-contains', props.dayname]] }
    // { collection: 'notice', where: [ ['displayon', '==',true]  ]   }
    //remove where if you want to see all data from notice collection
    { collection: 'notice',where: [['uid', '==', props.auth.uid]] }
  ])
)(Dashboard)
