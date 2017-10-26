<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex md6>
        <v-text-field v-model="baseData.name" label="Class Name" ></v-text-field>
      </v-flex>
      <v-flex md6>
        <v-text-field textarea label="Example Names" v-model="baseData.exampleNames"></v-text-field>
      </v-flex>
      <v-flex md6>
        <vue-editor id="caFlavorText" v-model="baseData.flavorText" :editorToolbar="customToolbar"></vue-editor>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <h3 block>Backgrounds</h3>
    </v-layout>
    <v-layout row wrap v-if="backgrounds != {}">
      <v-flex md4 v-for="(background, index) in backgrounds" :key="index">
        <v-text-field v-model="background.title"></v-text-field>
        <vue-editor :id="'background' + index.split(' ').join('_')" v-model="background.text" :editorToolbar="customToolbar"></vue-editor>
      </v-flex>
      <v-flex md4 card>
        <v-text-field v-model="tempBackground.title" label="Background title" ></v-text-field>
        <vue-editor id="tempBackground" v-model="tempBackground.text" :editorToolbar="customToolbar" placeholder="Background text"></vue-editor>
        <v-btn color="secondary" dark @click="addBackground">Add background</v-btn>
      </v-flex>
    </v-layout>
    <v-btn fab fixed bottom right color="primary" dark @click="updateBaseInfo">
      <v-icon>save</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')

import { VueEditor } from 'vue2-editor'

let charRef

export default {
  name: 'CharactersAdmin',
  data () {
    return {
      baseData: {},
      exampleNames: {},
      backgrounds: {},
      tempBackground: { title: '', text: '' },
      drives: {},
      flavorText: '',
      look: {},
      sampleBonds: [],
      startingBonds: 0,
      customToolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'bullet'}]
      ]
    }
  },
  components: {
    VueEditor
  },
  mounted () {
    charRef = firebase.firestore().doc('characters/' + this.$route.params.className)
    charRef.get()
      .then((doc) => {
        if (doc.exists) {
          this.baseData = {...doc.data()}
        }
      })
    charRef.collection('backgrounds').get()
      .then((querySnapshot) => {
        let tempBGs = {}
        querySnapshot.forEach((doc) => {
          tempBGs[doc.id] = { ...doc.data() }
        })
        this.backgrounds = { ...tempBGs }
      })
  },
  methods: {
    updateBaseInfo () {
      let batch = firebase.firestore().batch()
      let updatedBaseInfo = {
        exampleNames: this.baseData.exampleNames,
        name: this.baseData.name,
        flavorText: this.baseData.flavorText
      }
      batch.update(charRef, updatedBaseInfo)

      for (let background in this.backgrounds) {
        let bgRef = charRef.collection('backgrounds').doc(background)
        batch.set(bgRef, this.backgrounds[background])
      }

      batch.commit(updatedBaseInfo)
        .then(() => {
          console.log('succesfully updated base info')
        })
        .catch((error) => {
          console.log('Error updating document: ' + error)
        })
    },
    addBackground () {
      this.backgrounds[this.tempBackground.title.replace(/[^\w]/g, '_')] = { ...this.tempBackground }
      this.tempBackground.title = ''
      this.tempBackground.text = ''
    }
  }
}
</script>

<style>

</style>
