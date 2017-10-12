<template>
  <div>
    <div class="inline field"  v-for="(drive, index) in drives" v-bind:key="index">
      <div class="ui radio">
        <input type="radio" name="drive" :value="drive" v-model="selectedDrive" @change="selectDrive">
        <label for="drive"><strong>{{drive.title}}</strong></label>
        <p>{{drive.description}}</p>
      </div>
    </div>
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
        error: '',
        classId: this.cClass
      }
    },
    methods: {
      selectDrive () {
        console.log('selected')
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
