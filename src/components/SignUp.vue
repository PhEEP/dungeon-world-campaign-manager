<template>
<v-container fluid fill-height class="signup">
    <v-layout row wrap align-center>
      <v-flex md4 offset-md4 sm6 offset-sm3>
        <v-card light>
          <v-card-title primary-title>
            <h3 class="headline mb-2">
              Speak, friend, and enter
            </h3>
          </v-card-title>
          <v-card-text>

          <v-text-field label="Email" placeholder="Email" v-model="email"></v-text-field>
          <v-text-field type="password" label="Password" placeholder="Password" v-model="password"></v-text-field>
          <v-btn flat color="primary"@click="signUp">Log In</v-btn>
          <v-btn color="primary"@click="signUpWithGoogle">With Google</v-btn>
          <div>
              Already have an account? <router-link to="/login">Log in!</router-link>
          </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
import { handleUserLogin } from '../helpers/handleUserLogin'
const provider = new firebase.auth.GoogleAuthProvider()

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
        .then(
          (user) => {
            handleUserLogin(user)
            this.$router.replace('hello')
          },
          (err) => {
            alert('Oops, ' + err.message)
          })
    },
    signUpWithGoogle () {
      firebase.auth().signInWithPopup(provider)
      .then(
          (user) => {
            handleUserLogin(user)
            this.$router.replace('hello')
          },
          (err) => {
            alert('Oops, ' + err.message)
          })
    }
  }
}
</script>

<style scoped>
.signup {
  background-image: url('https://placeimg.com/1920/1080/nature');
  background-size: cover;
  background-position: center;
  background-repeat:no-repeat;
  height: 100vh;
  margin: 0;
}
</style>
