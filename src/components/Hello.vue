<template>
<v-container fluid>
  <v-parallax :src="hero" >
    <v-layout column align-center justify-center>
        <h1 display-4>
          WoACM
        </h1>
        <h2>Keep everything in order</h2>
    </v-layout>
  </v-parallax>
  <v-layout row wrap mt2>
    <v-flex sm12 md4>
      <h3 class="display-2">Characters</h3>
      <p class="body-1">Manage your character sheets, keep track of the small stuff, have fun!</p>
      <v-btn block color="accent" dark @click="$router.push('/characters')">Create/Manage Characters</v-btn>
    </v-flex>
    <v-flex sm12 md4>
      <h3 class="display-2">Campaigns</h3>
      <p class="body-1">Keep your notes in order, your players informed, and your creations at your fingertips</p>
    </v-flex>
    <v-flex sm12 md4>
      <h3 class="display-2">Compendium</h3>
      <p class="body-1">Browse the accumulated knowledge of the ages, create new NPCs, find treasure</p>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase'
import hero from '../assets/adventure_hero.jpg'
export default {
  name: 'Hello',
  data () {
    return {
      userName: '',
      hero: hero
    }
  },
  mounted () {
    let user = firebase.auth().currentUser
    if (user) this.userName = user.displayName
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
