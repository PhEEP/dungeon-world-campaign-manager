<template>
  <v-container fluid fill-height class="login">
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

          <v-text-field label="Email" placeholder="Email" v-model="email"></v-text-field>
          <v-text-field type="password" label="Password" placeholder="Password" v-model="password"></v-text-field>
          <v-btn flat color="primary"@click="login">Log In</v-btn>
          <v-btn color="primary"@click="loginWithGoogle">With Google</v-btn>
          <div>
              Don't have an account?<router-link to="/signup">Create one!</router-link>
          </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      provider: ''
    }
  },
  computed: {
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
    login () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    loginWithGoogle () {
      this.provider = 'google'
      this.signInWithProvider()
    },
    signInWithProvider () {
      this.$store.dispatch('signUserInWithProvider', {provider: this.provider})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped>
/* replace this with some calculated image from an api or something */
.login {
  background-image: url('https://placeimg.com/1920/1080/nature');
  background-size: cover;
  background-position: center;
  background-repeat:no-repeat;
  height: 100vh;
  margin: 0;
}
</style>
