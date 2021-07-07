export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();    
    const firestore = getFirebase().firestore();

    
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

export const signUp0 = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log('signUp0')
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(resp => {
      alert( resp)
console.log(resp.user.email)
      return firestore.collection('users').doc(resp.user.email).set({
        firstname: newUser.firstName,
        lastname: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      });
    }).then(() => {
      alert('then action')
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      console.log('catch action', err)
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
  }
}
//hooks code over
export const signUp111 = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log('signUp')
    const firebase = getFirebase();
    const firestore =getFirebase().firestore();
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        Dept: newUser.Dept,
        Mobile: newUser.Mobile,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: resp.user.email,
        role: newUser.role,
        userDoc: newUser.userDoc.toString(),
        createdAt: new Date(),
        initials: newUser.firstName[0] + newUser.lastName[0]
      });
    }, { merge: true }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
      //adding to list
      alert('SIGNUP_SUCCESS')
      console.log(newUser.Mobile + '#' + newUser.firstName + ' ' + newUser.lastName + '#' + newUser.Dept)
      if (newUser.olddata) {
        firestore.collection('usersarray').doc(newUser.userDoc.toString()).update({
          list_arr: firestore.FieldValue.arrayRemove(newUser.olddata),
          srno: firestore.FieldValue.increment(-1)
          //todo date juni method (displayon condition)
        })
      }
      firestore.collection('usersarray').doc(newUser.userDoc.toString()).update({
        list_arr: firestore.FieldValue.arrayUnion(newUser.Mobile + '#' + newUser.firstName + ' ' + newUser.lastName + '#' + newUser.Dept),
        srno: firestore.FieldValue.increment(1)
        //todo date juni method (displayon condition)
      }).then(() => {
        dispatch({ type: 'CREATE_LISTS_SUCCESS' });
      }).catch(err => {
        alert('Advertise not saved ', err)
        dispatch({ type: 'CREATE_LISTS_ERROR' }, err);
      });
      //listing over
    }).catch((err) => {
      alert('fail', err)
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
  }
}