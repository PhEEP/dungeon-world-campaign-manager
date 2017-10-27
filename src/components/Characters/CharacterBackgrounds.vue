<template>
  <v-radio-group v-model="selectedBackground" :mandatory="false" @change="selectBackground">
    <v-radio v-for="(background, index) in backgrounds" v-bind:key="index" :label="background.title" :value="background" ></v-radio>
  </v-radio-group>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')

  export default {
    name: 'CharacterBackgrounds',
    props: ['cClass'],
    data () {
      return {
        backgrounds: [],
        selectedBackground: {},
        error: '',
        classId: this.cClass
      }
    },
    components: {
    },
    methods: {
      selectBackground () {
        this.$emit('selected', this.selectedBackground)
      }
    },
    mounted () {
      console.log(this.classId)
      firebase.firestore().collection('characters/' + this.classId + '/backgrounds').get()
        .then((querySnapshot) => {
          console.log(querySnapshot, 'characters/' + this.classId + '/backgrounds')
          querySnapshot.forEach((doc) => {
            this.backgrounds.push(doc.data())
          })
        })
        .catch((error) => {
          console.log('error')
          this.error = error
        })
    }
  }

</script>

<style>
#background-editor {
  height: 200px;
}
</style>
