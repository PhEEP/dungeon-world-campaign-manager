<template>
  <nav class="ui fixed inverted menu" v-show="loggedIn">
    <div class="ui container">
      <div class="item header">
        Dungeon World Campaign Manager
      </div>
      <a href="#" @click.prevent="logOut" class="item">Log Out</a>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'dwcm-nav',
  data () {
    return {
      loggedIn: false
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

    if (currentUser) this.loggedIn = true
  },
  computed: {

  }
}
</script>

<style>

</style>
