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
  firebase.firestore().doc('users/' + userInfo.uid).set(userData)
  .then((currentUserData) => {
    if (currentUserData === null) {
      console.log('current user data null in firestore addition')
      return userData
    }
    console.log('Successfully added user')
  })
  .catch((err) => {
    console.log(err)
  })
  firebase.database().ref('users/').child(userInfo.uid).transaction(function (currentUserData) {
    if (currentUserData === null) {
      console.log('current user data null in firestore')
      return userData
    }
  }, function (error, committed) {
    console.log(error, 'error on create')
    console.log(committed, 'committed on create')
  })
}
