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
    console.log('profile', profile.firstName)
    console.log(this.props.firestore.data)
    console.log('auth', auth.email)


    //if (!projects) return <Redirect to='/edit' />  

    // if (auth && !auth.uid) return <Redirect to='/signin' />

    if (profile.isLoaded) {
      // if ( !profile.firstName) return <Redirect to='/signup' />
      if (projects) {
        let Reslt = this.props.projects.filter(
          (projet) => { return projet.FirstName.indexOf(this.state.value) === -1 }
        )


        return (
          <div className="dashboard container">
            {/*this.state.showing
            ? <div>This is visible  <input><i className = "material-icons ">cloud</i></inpit>  </div>
            : null
          */ }

            <div className="col s12 m2">
              notice
            < NoticeDats project4={Reslt} />
              {/* following is now not reqquired, it is already called in above component to avoid
            data reloading from firebase  */}
            result
            {Reslt.map(project3 => {
                if (auth.uid) {
                  return (
                    <div>
                      auth.uid
                      < Notice project4={project3} />
                    </div>
                  )
                }
                else {
                  return (
                    <div>
                      No uid
                      < Notice project4={project3} key={project3.id} />
                    </div>
                  )
                }
              }
              )}
            </div>
          </div>

        )
      }
      else {
        return (<div><h4>updating data ....</h4></div>)
      }
    } else {
      return (<div><h4>.........</h4></div>)
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
    { collection: 'notice' }
  ])
)(Dashboard)
