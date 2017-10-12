<template>
<div>
  <div class="ui main container">
    <h1 class="header">Characters</h1>
    <div class="ui stackable grid"  v-for="cClass in characterClasses" v-bind:key="cClass.id">
      <div class="sixteen wide column">
      <h2>{{ cClass.name }}</h2>
      </div>
      <div class="four wide column">
        <img src="http://placehold.it/120/120" alt="" class="ui centered medium image">
      </div>
      <div class="twelve wide column">
        <p>
          {{ cClass.flavorText }}
        </p>
        <button class="ui button">
          <router-link :to="'/characters/new/' + cClass.id">Create {{ cClass.name }}</router-link>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
export default {
  name: 'Characters',
  data () {
    return {
      characters: '',
      characterClasses: []
    }
  },
  mounted () {
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
          flavorText: doc.data().flavorText
        })
      })
    })
  }
}
</script>

<style>

</style>
