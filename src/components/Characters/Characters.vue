<template>
  <div class="ui main container">
    <div class="ui main stackable grid container">
    <h1 class="header">Characters</h1>
      <div class="ui five stackable link cards">
        <router-link class="card" :to="'/character/' + character.id" v-for="(character, index) in createdCharacters" v-bind:key="index">
          <div class="image">
            <img :src="character.avatar" alt="">
          </div>
          <div class="content">
            <div class="header">{{ character.name }}</div>
            <div class="meta">{{ character.className }}</div>
          </div>
        </router-link>
      </div>
      <div class="ui red segment text container" v-if="characterCount >= 5">You've hit max characters, kill one to give another life!</div>
      <div class="ui row" v-for="cClass in characterClasses" v-bind:key="cClass.id">
        <div class="sixteen wide column">
          <h2>{{ cClass.name }}</h2>
        </div>
        <div class="four wide column">
          <img :src="cClass.classIcon" :title="cClass.classIconAttribution" class="ui centered medium image">
        </div>
        <div class="twelve wide column">
          <p>
            {{ cClass.flavorText }}
          </p>
          <router-link :to="'/characters/new/' + cClass.id" class="ui primary button" v-if="characterCount <= 4">Create {{ cClass.name }}</router-link>
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
