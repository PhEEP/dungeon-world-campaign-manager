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
  // .then((currentUserData) => {
  //   if (currentUserData === null) {
  //     console.log('current user data null in firestore addition')
  //   }
  //   console.log('Successfully added user')
  //   return userData
  // })
  // .catch((err) => {
  //   console.log(err)
  // })
  // firebase.database().ref('users/').child(userInfo.uid).transaction(function (currentUserData) {
  //   if (currentUserData === null) {
  //     console.log('current user data null in firestore')
  //     return userData
  //   }
  // }, function (error, committed) {
  //   console.log(error, 'error on create')
  //   console.log(committed, 'committed on create')
  // })
}
