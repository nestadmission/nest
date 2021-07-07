import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// firebase project on nestadmission@gmail,sgsbackup1
var config = {
 /* apiKey: "AIzaSyDNRtpa86v986mO3pePPursUW1XtahmrDo",
  authDomain: "gfem-b7b57.firebaseapp.com",
  databaseURL: "https://gfem-b7b57.firebaseio.com",
  projectId: "gfem-b7b57",
  storageBucket: "gfem-b7b57.appspot.com",
  messagingSenderId: "144283479484",
  appId: "1:144283479484:web:6860f178f587058f9acfb9"*/
  apiKey: "AIzaSyDcx4lniuQIs0RBxI8gKfhDjGIl1hkc8sU",
  authDomain: "nestpravesh.firebaseapp.com",
  projectId: "nestpravesh",
  storageBucket: "nestpravesh.appspot.com",
  messagingSenderId: "591686214515",
  appId: "1:591686214515:web:fe26a6284e41d961c01b06",
  measurementId: "G-MG53QGKEE6"

};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 