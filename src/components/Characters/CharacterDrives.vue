<template>
  <div>
    <h5 class="title">Drive
      <h5 class="subheading">Choose one or write your own</h5>
    </h5>
    <v-text-field v-model="currentDrive.title" @input="updateDrive" placeholder="Title"></v-text-field>
    <v-text-field multi-line v-model="currentDrive.description" placeholder="Drive Description" @input="updateDrive"/>
    <v-radio-group v-model="selectedDrive" :mandatory="false" @change="selectDrive">
      <v-radio v-for="(drive, index) in drives" :key="index" :label="drive.title" :value="drive" ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')

  export default {
    name: 'CharacterDrives',
    props: ['cClass'],
    data () {
      return {
        drives: [],
        selectedDrive: {},
        currentDrive: {},
        error: '',
        classId: this.cClass
      }
    },
    methods: {
      selectDrive () {
        this.currentDrive = { ...this.selectedDrive }
        this.$emit('selected', this.selectedDrive)
      },
      updateDrive () {
        this.$emit('updateDrive', this.currentDrive)
      }
    },
    mounted () {
      console.log(this.classId)
      firebase.firestore().collection('characters/' + this.classId + '/drives').get()
        .then((querySnapshot) => {
          console.log(querySnapshot, 'characters/' + this.classId + '/drives')
          querySnapshot.forEach((doc) => {
            this.drives.push(doc.data())
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

</style>
