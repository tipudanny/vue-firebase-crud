
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAnm9QWNJmQwAxeXMmSWr4hlo60yB_Qsco",
    authDomain: "vue-firebase-crud-b4226.firebaseapp.com",
    databaseURL: "https://vue-firebase-crud-b4226-default-rtdb.firebaseio.com",
    projectId: "vue-firebase-crud-b4226",
    storageBucket: "vue-firebase-crud-b4226.appspot.com",
    messagingSenderId: "526193935139",
    appId: "1:526193935139:web:f9ab605266cfb80fc84296"
  };

firebase.initializeApp(firebaseConfig);
export const database = firebase.database();