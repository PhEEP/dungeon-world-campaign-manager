<template>
  <v-radio-group v-model="selectedDrive" :mandatory="false" @change="selectDrive">
    <v-radio v-for="(drive, index) in drives" :key="index" :label="drive.title" :value="drive" ></v-radio>
  </v-radio-group>
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
        classId: this.cClass
      }
    },
    methods: {
      selectDrive () {
        this.$emit('selected', this.selectedDrive)
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
