<template>
  <div class="ui fixed inverted pointing menu" v-show="loggedIn">
    <div class="ui container">
      <div class="item header">
        <router-link to="/">DWCM</router-link>
      </div>
      <div class="item">
        <router-link to="/campaigns">Campaigns</router-link>
      </div>
      <div class="right item">
        <router-link to="/profile">
          <img class="ui avatar image" :src="userPhoto">
          <span>{{ userName }}</span>
        </router-link>
      </div>
      <a href="#" @click.prevent="logOut" class="item">Log Out</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'dwcm-nav',
  data () {
    return {
      loggedIn: false,
      userName: '',
      userPhoto: ''
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
      .then(() => {
        this.$router.replace('login')
        this.userName = ''
        this.userPhoto = ''
      })
    }
  },
  mounted () {
    console.log('mounted nav')
    let currentUser = firebase.auth().currentUser
    console.log(currentUser)
    if (currentUser) {
      this.loggedIn = true
      this.userName = currentUser.displayName
      this.userPhoto = currentUser.photoURL
    } else {
      this.loggedIn = false
    }
  },
  updated () {
    console.log('updated nav')
    let currentUser = firebase.auth().currentUser
    if (currentUser) {
      this.loggedIn = true
      this.userName = currentUser.displayName
      this.userPhoto = currentUser.photoURL
    } else {
      this.loggedIn = false
    }
  }
}
</script>

<style>

</style>
