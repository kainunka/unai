import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyA7hnGrF2yIxOjcIT9roj4ARxjO0ouSmUA",
  authDomain: "utnai-169809.firebaseapp.com",
  databaseURL: "https://utnai-169809.firebaseio.com",
  storageBucket: "utnai-169809.appspot.com"
};

const apiFirebase = firebase.initializeApp(firebaseConfig);


export default apiFirebase;