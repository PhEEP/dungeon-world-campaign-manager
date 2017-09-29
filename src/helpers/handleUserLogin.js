import firebase from 'firebase'
export const handleUserLogin = (user) => {
  let userInfo = user.user
  let userData = {
    displayName: userInfo.displayName,
    email: userInfo.email,
    avatar: userInfo.photoURL,
    userID: userInfo.uid
  }
  firebase.database().ref('users/').child(userInfo.uid).transaction(function (currentUserData) {
    if (currentUserData === null) {
      return userData
    }
  }, function (error, committed) {
    console.log(error, 'error on create')
    console.log(committed, 'committed on create')
  })
}
