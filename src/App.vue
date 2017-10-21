<template>
  <v-app>
    <v-toolbar color="primary" v-show="loggedIn">
      <v-btn icon @click="$router.push('hello')" >
        <v-icon>home</v-icon>
      </v-btn>
      <!-- <v-btn flat @click="$router.push('campaigns')">Campaigns</v-btn> -->
      <v-btn flat @click="$router.push('characters')">Characters</v-btn>
      <!-- <v-btn flat @click="$router.push('compendium')">Compendium</v-btn> -->
      <v-spacer></v-spacer>
      <v-btn fab flat @click="$router.push('profile')">
        <v-avatar size="36px"  >
          <img :src="userPhoto" >
        </v-avatar>
      </v-btn>
      <v-btn flat href="#" @click.prevent="logOut">Log Out</v-btn>
    </v-toolbar>
    <main>
      <v-content>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App',
  components: {
  },
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
