<template>
  <div class="ui main fluid container" v-if="character !== {}">
    <h1 class="ui header">{{ character.name }}
      <div class="sub header">{{ character.className }}</div>
    </h1>
    <div class="ui stackable grid">
      <div class="ui four wide column">
        <CharacterDetails
          :avatarUrl="character.avatarUrl"
          :drive="character.drive"
          :background="character.background"
          :look="character.look"
          :sampleBonds="character.sampleBonds"
          >
        </CharacterDetails>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="ui orange text container segment">
      oops, looks like you need to create a character
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
import _ from 'lodash'
import CharacterDetails from '@/components/Character/CharacterDetails'

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
  },
  components: {
    CharacterDetails
  }
}
</script>

<style>

</style>
