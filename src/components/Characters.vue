<template>
<div>
  <div class="ui main container">
    <h1 class="header">Characters</h1>
    <pre>
      {{ characters }}
    </pre>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'characters',
  data () {
    return {
      characters: ''
    }
  },
  mounted () {
    firebase.database().ref('characters/baseClass').once('value')
    .then((snapshot) => {
      this.characters = snapshot.val()
    })
  }
}
</script>

<style>

</style>
