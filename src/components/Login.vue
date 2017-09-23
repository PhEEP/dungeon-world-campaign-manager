<template>
  <div class="login ui">
    <h1 class="ui title">Sign In</h1>
    <div class="ui input">
      <input type="text" placeholder="Email" v-model="email">
    </div>
    <div class="ui input">
      <input type="password" placeholder="Password" v-model="password">
    </div>
    <button class="ui button" @click="login">Connection</button>
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
