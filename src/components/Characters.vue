<template>
<div>
  <div class="ui main container">
    <h1 class="header">Characters</h1>
      <h2>Create New</h2>
      <ul>
        <router-link :to="'/characters/new/' + cClass.id" v-for="cClass in characterClasses" v-bind:key="cClass.id" style="padding:1rem;">{{ cClass.name }}</router-link>
      </ul>
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
          name: doc.data().name
        })
      })
    })
  }
}
</script>

<style>

</style>
