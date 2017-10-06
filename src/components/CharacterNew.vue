<template>
  <div>
    <div class="ui main container">
      <h1 class="header">{{ classData.name }} : {{ characterName }}</h1>
      <div class="ui fluid" v-if="typeof baseClassData !== 'string'">
        <p>{{classData.flavorText}}</p>
        <div class="ui labeled input">
          <div class="ui label">
            Name
          </div>
          <input type="text" name="characterName" class="ui" placeholder="Who are you?" v-model="characterName">
        </div>
        <div class="ui labeled input">
          <div class="ui label">
            Armour
          </div>
          <input type="number" name="armour" class="ui" :placeholder="baseClassData.armour" disabled>
        </div>
        <div class="ui labeled input">
          <div class="ui label">
            Coins
          </div>
          <input type="number" name="coins" class="ui" :placeholder="baseClassData.coins" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
export default {
  name: 'CharacterNew',
  data () {
    return {
      classId: this.$route.params.className,
      classData: '',
      baseClassData: '',
      characterName: ''
    }
  },
  mounted () {
    firebase.firestore().doc('characters/baseClass').get()
    .then((doc) => {
      if (doc.exists) {
        this.baseClassData = doc.data()
      } else {
        console.log('no base class')
      }
    })
    .catch((err) => {
      console.log('Error: ', err)
    })
    firebase.firestore().doc('characters/' + this.classId).get()
    .then((doc) => {
      if (doc.exists) {
        this.classData = doc.data()
      } else {
        console.log('no doc')
      }
    })
    .catch((err) => {
      console.log('Error: ', err)
    })
  }
}
</script>

<style>

</style>
