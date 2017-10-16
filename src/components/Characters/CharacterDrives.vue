<template>
<div class="row">
  <div class="ui stackable grid segment">
      <div class="sixteen wide column">
        <h3 class="ui header">Drive
          <div class="sub header">Choose one or write your own</div>
        </h3>
      </div>
      <div class="four wide column">
        <div class="ui labeled input">
          <input type="text" v-model="currentDrive.title" placeholder="Drive Title">
        </div>
        <div class="field">
          <textarea rows="4" v-model="currentDrive.description" placeholder="Drive Description" />
        </div>
      </div>
      <div class="four wide column"  v-for="(drive, index) in drives" v-bind:key="index">
        <div class="inline field" >
          <div class="ui radio checkbox">
            <input type="radio" name="drive" :value="drive" v-model="selectedDrive" @change="selectDrive">
            <label for="drive"><strong>{{drive.title}}</strong></label>
            <p>{{drive.description}}</p>
          </div>
        </div>
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
        currentDrive: {},
        error: '',
        classId: this.cClass
      }
    },
    methods: {
      selectDrive () {
        this.currentDrive = Object.assign({}, this.selectedDrive)
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
