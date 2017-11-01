import firebase from 'firebase'
require('firebase/firestore')
export const handleUserLogin = (user) => {
  let userInfo = user.user
  let userData = {
    displayName: userInfo.displayName,
    email: userInfo.email,
    avatar: userInfo.photoURL,
    userID: userInfo.uid
  }
  let userRef = firebase.firestore().doc('users/' + userInfo.uid)
  userRef.get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()
      } else {
        userRef.add(userData)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
