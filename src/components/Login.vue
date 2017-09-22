<template>
  <div class="login container">
    <h1 class="title">Sign In</h1>
    <input class="input" type="text" placeholder="Email" v-model="email">
    <input class="input" type="password" placeholder="Password" v-model="password">
    <button class="button" @click="login">Connection</button>
    <p>Don't have an account? <router-link to="/signup">Create one!</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(
        (user) => {
          alert('connected!')
        },
        (err) => {
          alert('Oops, ' + err.message)
        }
      )
    }
  }
}
</script>

<style>
.login {
  max-width: 400px;
}
</style>
