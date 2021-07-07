export const createProject = (project) => {
  return (dispatch, getState, { getFirebase }) => {

    const firestore = getFirebase().firestore()
    const firebase=getFirebase();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    console.log(project)
if(project.id1!=='a'){
 // alert('old data')
    firestore.collection('notice').doc(project.id1).set({
      ...project,
      authorFirstName: 'profile.firstname',
      authorLastName: 'profile.lastname',
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_VisitingDr_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_Visiting_ERROR' }, err);
    });
    firestore.collection('notice2').doc('01').update({
    
      srno:firebase.firestore.FieldValue.increment(50),
      firm:"fir",
      list:firebase.firestore.FieldValue.arrayUnion("greater_virginia")

    })




  }else{
    firestore.collection('notice').doc(authorId).set({
      //data should be added in array too-to reduce biiling read cost
      ...project,
      uid:authorId,     
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_VisitingDr_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_Visiting_ERROR' }, err);
    });
  }


  }
};
