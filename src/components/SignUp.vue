<template>
<div class="ui middle aligned center aligned centerAligned grid signup">
  <div class="column ui segment">
    <h2 class="ui orange image header">
      <img src="http://placehold.it/50x50?color=red" alt="" class="image">
      <div class="content">Speak, friend, and enter</div>
    </h2>
    <div class="ui large form">
      <div class="ui staked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" placeholder="Password" v-model="password">
          </div>
        </div>
        <button class="ui fluid large orange submit button" @click="signUp">Sign Up</button>
      </div>
    </div>
    <div class="ui message">
      <p>Already have an account?
        <router-link to="/login">Log in!</router-link>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        firebase.firestore().doc('users/' + user.uid).set({
          displayName: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          userID: user.uid
        })
        .then(() => {
          console.log('User added to Firestore!')
          this.$router.replace('hello')
        })
        .catch((err) => {
          console.log(err)
        })
        firebase.database().ref('users/' + user.uid).set({
          displayName: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          userID: user.uid
        })
        alert('Your Account has been created!')
        this.$router.replace('hello')
      }, (err) => {
        alert('Oops, ' + err.message)
      })
    }
  }
}
</script>

<style scoped>
.centerAligned {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.grid {
  height:100%;
}
.column {
  max-width:400px;
}
.signup {
  background-image: url('https://placeimg.com/1920/1080/nature');
  background-size: cover;
  background-position: center;
  background-repeat:no-repeat;
}
</style>
