<template>
  <div class="signup container">
      <h1 class="title">Sign Up</h1>
      <input class="input" type="text" placeholder="Email" v-model="email">
      <input class="input" type="password" placeholder="Password" v-model="password">
      <button class="button" @click="signUp">Sign Up</button>
      <p>Let's create a new account! <router-link to="login">Already have one?</router-link> </p>
  </div>
</template>

<script>
import firebase from 'firebase'
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
    }
  }
}
</script>

<style>
.signup {
  max-width: 400px;
}
</style>
