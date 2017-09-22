<template>
  <div class="signup container">
      <h1 class="title">Sign Up</h1>
      <input class="input" type="text" placeholder="Email" >
      <input class="input" type="password" placeholder="Password" >
      <button class="button">Connection</button>
      <p>Let's create a new account! <router-link to="login">Already have one?</router-link> </p>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
.signup {
  max-width: 400px;
}
</style>
