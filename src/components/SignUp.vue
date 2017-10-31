<template>
  <v-container fluid fill-height class="signup">
    <v-layout row wrap align-center>
      <v-flex md4 offset-md4 sm6 offset-sm3>
        <v-card light>
          <span v-if="error">
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </span>
          <v-progress-linear v-bind:indeterminate="true" v-if="loading"></v-progress-linear>
          <v-card-title primary-title>
            <h3 class="headline mb-2">
              Speak, friend, and enter
            </h3>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Email" type="email" id="email" v-model="email"></v-text-field>
            <v-text-field type="password" label="Password" v-model="password" id="password"></v-text-field>
            <v-text-field label="Confirm Password" type="password" v-model="confirmPassword" id="confirmPassword" :rules="[comparePasswords]"></v-text-field>
            <v-btn flat color="primary"@click="signUp">Log In</v-btn>
            <v-btn color="primary" @click="signUpWithGoogle">With Google</v-btn>
            <p>
                Already have an account? <router-link to="/login">Log in!</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      provider: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    signUp () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      // firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      //   .then(
      //     (user) => {
      //       handleUserLogin(user)
      //       this.$router.replace('hello')
      //     },
      //     (err) => {
      //       alert('Oops, ' + err.message)
      //     })
    },
    signUpWithGoogle () {
      this.provider = 'google'
      this.signInWithProvider()
    },
    signInWithProvider () {
      this.$store.dispatch('signUserInWithProvider', {provider: this.provider})
      // firebase.auth().signInWithPopup(provider)
      // .then(
      //     (user) => {
      //       handleUserLogin(user)
      //       this.$router.replace('hello')
      //     },
      //     (err) => {
      //       alert('Oops, ' + err.message)
      //     })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
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
