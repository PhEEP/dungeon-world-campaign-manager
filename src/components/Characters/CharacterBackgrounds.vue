<template>
<div>
  <h5 class="title">Background
    <h5 class="subheading">Choose one or write your own</h5>
  </h5>
  <v-text-field  v-model="currentBackground.title" placeholder="Background Title" @input="updateBackground">
  </v-text-field>
  <vue-editor v-model="currentBackground.text" :editorToolbar="customToolbar" placeholder="Background description" id="background-editor" @input="updateBackground"></vue-editor>
  <v-radio-group v-model="selectedBackground" :mandatory="false" @change="selectBackground">
    <v-radio v-for="(background, index) in backgrounds" v-bind:key="index" :label="background.title" :value="background" ></v-radio>
  </v-radio-group>
</div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')
  import { VueEditor } from 'vue2-editor'
  // import _ from 'lodash'

  export default {
    name: 'CharacterBackgrounds',
    props: ['cClass'],
    data () {
      return {
        backgrounds: [],
        selectedBackground: {},
        currentBackground: {},
        error: '',
        classId: this.cClass,
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'bullet' }]
        ]
      }
    },
    components: {
      VueEditor
    },
    methods: {
      selectBackground () {
        console.log(this.selectedBackground)
        this.currentBackground = { ...this.selectedBackground }
        this.$emit('selected', this.selectedBackground)
      },
      updateBackground () {
        this.$emit('updateBackground', this.currentBackground)
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
