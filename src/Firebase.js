import firebase from "firebase";

const firebaseConfig = {
  //firebaseInfo here
};
// Initialize Firebase
const firebaseDb = firebase.initializeApp(firebaseConfig);

export default firebaseDb.database().ref();
