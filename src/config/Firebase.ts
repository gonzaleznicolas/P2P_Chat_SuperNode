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
 * Utility class for interacting with Firebase authorization API
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

  getCollection(dbPath: string) {
    return this.DB.collection(dbPath).get();
  }
}

export const firebaseObject = new Firebase();
