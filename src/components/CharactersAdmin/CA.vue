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
        <v-text-field v-model="tempBackground.title" label="Background Title" ></v-text-field>
        <vue-editor id="tempBackground" v-model="tempBackground.text" :editorToolbar="customToolbar" placeholder="Background text"></vue-editor>
        <v-btn color="secondary" dark @click="addBackground">Add background</v-btn>
      </v-flex>
    </v-layout>
    <h3 block>Drives</h3>
    <v-layout row wrap v-if="drives != {}">
      <v-flex md4 v-for="(drive, index) in drives" :key="index">
        <v-text-field v-model="drive.title"></v-text-field>
        <v-text-field textarea v-model="drive.description"></v-text-field>
      </v-flex>
      <v-flex md4 card>
        <v-text-field v-model="tempDrive.title" label="Drive Title" ></v-text-field>
        <v-text-field textarea id="tempDrive" v-model="tempDrive.description" label="Drive Text"></v-text-field>
        <v-btn color="secondary" dark @click="addDrive">Add drive</v-btn>
      </v-flex>
    </v-layout>
    <h3 block>Bonds</h3>
    <v-layout row wrap v-if="bonds != {}">
      <v-flex xs12 sm6 v-for="(bond, index) in bonds" :key="index">
        <v-text-field :value="bond"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 card>
        <v-text-field v-model="tempBond" label="Bond" ></v-text-field>
        <v-btn color="secondary" dark @click="addBond">Add bond</v-btn>
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
      drives: {},
      look: {},
      bonds: [],
      tempBackground: { title: '', text: '' },
      tempDrive: { title: '', description: '' },
      tempBond: '',
      flavorText: '',
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
    charRef.collection('drives').get()
      .then((querySnapshot) => {
        let tempDrives = {}
        querySnapshot.forEach((doc) => {
          tempDrives[doc.id] = { ...doc.data() }
        })
        this.drives = { ...tempDrives }
      })
  },
  methods: {
    updateBaseInfo () {
      let batch = firebase.firestore().batch()
      let updatedBaseInfo = {
        exampleNames: this.baseData.exampleNames,
        name: this.baseData.name,
        flavorText: this.baseData.flavorText,
        sampleBonds: this.bonds
      }
      batch.update(charRef, updatedBaseInfo)

      for (let background in this.backgrounds) {
        let bgRef = charRef.collection('backgrounds').doc(background)
        batch.set(bgRef, this.backgrounds[background])
      }

      for (let drive in this.drives) {
        let driveRef = charRef.collection('drives').doc(drive)
        batch.set(driveRef, this.drives[drive])
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
    },
    addDrive () {
      this.drives[this.tempDrive.title.replace(/[^\w]/g, '_')] = { ...this.tempDrive }
      this.tempDrive.title = ''
      this.tempDrive.description = ''
    },
    addBond () {
      this.bonds.push(this.tempBond)
      this.tempBond = ''
    }
  }
}
</script>

<style>

</style>
