<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed color="primary" app>

      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        WoACM
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-only" v-if="loggedIn">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
          :disabled="!item.active"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn fab flat @click="$router.push('/profile')">
          <v-avatar size="36px"  >
            <img :src="userPhoto" >
          </v-avatar>
        </v-btn>
        <v-btn flat href="#" @click.prevent="logOut">Log Out</v-btn>
      </v-toolbar-items>
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
      userPhoto: '',
      menuItems: [
        { icon: 'home', title: 'Home', link: '/hello', active: true },
        { icon: 'recent_actors', title: 'Characters', link: '/characters', active: true },
        { icon: 'book', title: 'Compendium', link: '/compendium', active: false },
        { icon: 'local_library', title: 'Campaigns', link: '/campaigns', active: false }
      ],
      sideNav: false
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
