<template>
  <v-container fluid grid-list-lg v-if="character !== {}">
    <v-layout row wrap>
      <v-flex sm4 md3>
        <CharacterDetails
          :avatarUrl="character.avatarUrl"
          :drive="character.drive"
          :background="character.background"
          :look="character.look"
          :sampleBonds="character.sampleBonds"
          :name="character.name"
          :className="character.className"
          >
        </CharacterDetails>
      </v-flex>
    </v-layout>
  </v-container>
  <div v-else>
    <div class="ui orange text container segment">
      oops, looks like you need to create a character
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
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
      return this.$_.filter(this.character.bonds, (o) => {
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
