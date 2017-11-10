<template>
<v-container fluid grid-list-lg>
  <v-parallax :src="hero" >
    <v-layout column align-center justify-center>
        <h2>Bring Peace and Order to your Campaign</h2>
    </v-layout>
  </v-parallax>
  <v-layout row wrap mt2>
    <v-flex sm12 md4>
      <v-card>
        <v-alert color="info" :value="true">In Development</v-alert>
        <v-card-title>
          <h3 class="display-2">Characters</h3>
        </v-card-title>
        <v-card-text>
          <p class="body-1">Manage your character sheets, keep track of the small stuff, have fun!</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" dark @click="$router.push('/characters')">Create/Manage Characters</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex sm12 md4>
      <v-card>
        <v-alert color="warning" :value="true">On Deck</v-alert>
        <v-card-title>
          <h3 class="display-2">Campaigns</h3>
        </v-card-title>
        <v-card-text>
          <p class="body-1">Keep your notes in order, your players informed, and your creations at your fingertips</p>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex sm12 md4>
      <v-card>
        <v-alert color="error" :value="true">On Deck</v-alert>
        <v-card-title>
          <h3 class="display-2">Compendium</h3>
        </v-card-title>
        <v-card-text>
          <p class="body-1">Browse the accumulated knowledge of the ages, create new NPCs, find treasure</p>
        </v-card-text>
      </v-card>
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
