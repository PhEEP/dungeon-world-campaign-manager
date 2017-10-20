<template>
  <div class="ui inverted fixed menu" v-show="loggedIn">
    <router-link to="/hello" class="header item" active-class="banana">WoACM</router-link>
    <!-- <router-link to="/campaigns" class="item">Campaigns</router-link> -->
    <router-link to="/characters" class="item">Characters</router-link>
    <!-- <router-link to="/compendium" class="item">Compendium</router-link> -->
    <router-link to="/profile" class="right item">
      <img class="ui avatar image" :src="userPhoto">
      <span>{{ userName }}</span>
    </router-link>
    <a href="#" @click.prevent="logOut" class="item">Log Out</a>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'DWCMNav',
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
    },
    isLoggedIn () {
      console.log('mounted')
      let currentUser = firebase.auth().currentUser
      if (currentUser) {
        this.loggedIn = true
        this.userName = currentUser.displayName
        this.userPhoto = currentUser.photoURL
      } else {
        this.loggedIn = false
      }
    }
  },
  watch: {
    '$route': 'isLoggedIn'
  },
  mounted () {
    this.isLoggedIn()
  },
  updated () {
  }
}
</script>

<style>

</style>
