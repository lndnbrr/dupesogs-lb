import firebase from 'firebase/app';
import 'firebase/auth';

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

function signOut() {
  firebase.auth().signOut();
}

export { signIn, signOut };
