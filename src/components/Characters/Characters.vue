<template>
  <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex md3 v-for="(character, index) in createdCharacters" v-bind:key="index">
          <v-card>
            <v-card-media :src="character.avatar || 'http://placehold.it/200/200'" height="200px"></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ character.name }}</h3>
                <div>{{ character.className }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn block color="secondary" @click="$router.push('/character/' + character.id)">{{ character.name }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 >
          <v-card dark tile color="error" v-if="characterCount >= 4"><v-card-text>You've hit max characters, kill one to give another life!</v-card-text></v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="cClass in characterClasses" v-bind:key="cClass.id">
          <v-card>
            <v-card-media height="200px" :src="cClass.classIcon" :title="cClass.classIconAttribution">
            </v-card-media>
            <v-card-title primary-title >
              <h4 mb-0>{{ cClass.name }}</h4>
              {{ cClass.flavorText }}
            </v-card-title>
            <v-card-actions v-if="characterCount < 4">
              <v-btn block color="secondary" @click="$router.push('/characters/new/' + cClass.id)">Create {{ cClass.name }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
import firebase from 'firebase'
require('firebase/firestore')
export default {
  name: 'Characters',
  data () {
    return {
      characters: '',
      characterClasses: [],
      createdCharacters: [],
      characterCount: 0
    }
  },
  mounted () {
    let user = firebase.auth().currentUser

    firebase.firestore().collection('users/' + user.uid + '/characters').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.characterCount++
          this.createdCharacters.push({
            id: doc.id,
            name: doc.data().name,
            avatar: doc.data().avatarUrl,
            className: doc.data().className
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
    firebase.firestore().doc('characters/baseClass').get()
    .then((doc) => {
      if (doc.exists) {
        this.characters = doc.data()
      } else {
        console.log('no doc')
      }
    })
    .catch((err) => {
      console.log('Error: ', err)
    })
    firebase.firestore().collection('characters').where('name', '>', '').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.characterClasses.push({
          id: doc.id,
          name: doc.data().name,
          flavorText: doc.data().flavorText,
          classIcon: doc.data().classIcon.iconUrl,
          classIconAttribution: doc.data().classIcon.attribution
        })
      })
    })
  }
}
</script>

<style>

</style>
