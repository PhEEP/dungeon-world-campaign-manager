<template>
  <v-toolbar color="primary" v-show="loggedIn">
    <v-btn icon @click="$router.push('hello')" >
      <v-icon>home</v-icon>
    </v-btn>
    <!-- <v-btn flat @click="$router.push('campaigns')">Campaigns</v-btn> -->
    <v-btn flat @click="$router.push('characters')">Characters</v-btn>
    <!-- <v-btn flat @click="$router.push('compendium')">Compendium</v-btn> -->
    <v-spacer></v-spacer>
    <v-btn fab flat >
      <v-avatar size="36px" @click="$router.push('profile')" >
        <img :src="userPhoto" >
      </v-avatar>
    </v-btn>
    <v-btn flat href="#" @click.prevent="logOut">Log Out</v-btn>
  </v-toolbar>
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
