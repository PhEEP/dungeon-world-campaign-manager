<template>
  <div class="login container">
    <h1 class="title">Sign In</h1>
    <input class="input" type="text" placeholder="Email" >
    <input class="input" type="password" placeholder="Password" >
    <button class="button" @click="login">Connection</button>
    <p>Don't have an account? <router-link to="/signup">Create one!</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {}
  },
  methods: {
    login () {
      this.$router.replace('Hello')
    }
  }
}
</script>

<style>
.login {
  max-width: 400px;
}
</style>
