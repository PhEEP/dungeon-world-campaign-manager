<template>
<div class="ui middle aligned center aligned grid signup">
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
        <button class="ui fluid large blue submit button" @click="loginWithGoogle" >Got Google?</button>
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
const provider = new firebase.auth.GoogleAuthProvider()
export default {
  name: 'signup',
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
        alert('Your Account has been created!')
      }, (err) => {
        alert('Oops, ' + err.message)
      })
    },
    loginWithGoogle () {
      firebase.auth().signInWithPopup(provider)
      .then(
        (user) => {
          this.$router.replace('hello')
        },
        (err) => {
          console.log(err)
          alert('Oops, ' + err.message)
        }
      )
    }
  }
}
</script>

<style>
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
