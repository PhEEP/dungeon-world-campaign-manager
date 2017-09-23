<template>
  <nav class="ui navbar">
    <a href="#" @click.prevent="logOut" v-show="showLogout" class="ui">Log Out</a>
  </nav>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'dwcm-nav',
  data () {
    return {
      showLogout: false
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
      .then(() => {
        this.$router.replace('login')
      })
    }
  },
  mounted () {
    let currentUser = firebase.auth().currentUser

    if (currentUser) this.showLogout = true
  },
  computed: {

  }
}
</script>

<style>

</style>
