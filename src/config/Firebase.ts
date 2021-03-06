import firebase from "firebase";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBe5jXeAPQhOWROBE82nmJZxgsaZvWFOFk",
  authDomain: "central-server-b819d.firebaseapp.com",
  databaseURL: "https://central-server-b819d.firebaseio.com",
  projectId: "central-server-b819d",
  storageBucket: "central-server-b819d.appspot.com",
  messagingSenderId: "672606841919",
  appId: "1:672606841919:web:3328552420c3c09eac5c8a",
  measurementId: "G-32GT9SVFEJ"
};

/**
 * Class that initializes the firebaseObject
 */
class Firebase {
  public DB: firebase.firestore.Firestore;

  /**
   * Constructs the Firebase utility class
   */
  constructor() {
    firebase.initializeApp(FIREBASE_CONFIG);
    this.DB = firebase.firestore();
  }
}

export const firebaseObject = new Firebase();
