<template>
  <div>
    <div class="ui main container">
      <h1 class="ui header">{{ character.name }}
        <div class="sub header">{{ character.className }}</div>
      </h1>
      <div class="ui stackable grid segment">
        <div class="four wide column">
          <div class="ui center aligned centered image">
            <img :src="character.avatarUrl" alt="">
          </div>
          <div v-html="character.look"></div>
        </div>
        <div class="four wide column">
          <h3 class="ui header">{{ character.drive.title }}</h3>
          <p>{{ character.drive.description }}</p>
        </div>
        <div class="four wide column">
          <h3 class="ui header">{{ character.background.title }}</h3>
          <div v-html="character.background.text"></div>
        </div>
        <div class="four wide column">
          <ul>
            <li v-for="(bond, index) in attachedBonds" v-bind:key="index" v-if="typeof bond.bond !== 'undefined'">
              {{ bond.beforeBond }} <strong v-text="bond.bond"></strong> {{ bond.afterBond }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
import _ from 'lodash'

export default {
  name: 'Character',
  data () {
    return {
      characterId: this.$route.params.id,
      character: {}
    }
  },
  computed: {
    attachedBonds () {
      return _.filter(this.character.bonds, (o) => {
        return typeof o.bond !== 'undefined'
      })
    }
  },
  mounted () {
    let user = firebase.auth().currentUser
    firebase.firestore().doc('users/' + user.uid + '/characters/' + this.characterId).get()
      .then((doc) => {
        if (doc.exists) {
          this.character = doc.data()
        } else {
          console.log('no character data')
        }
      })
  }
}
</script>

<style>

</style>
