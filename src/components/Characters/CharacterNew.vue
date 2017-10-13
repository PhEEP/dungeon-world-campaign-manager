<template>
  <div class="ui main container">
    <div class="ui small form">
      <h1 class="header">{{ classData.name }} : {{ characterName }}</h1>
      <div class="ui stackable grid" v-if="typeof baseClass !== 'string'">
        <div class="row">
          <div class="four wide column">
            <div class="ui labeled input">
              <div class="ui label">
                Name
              </div>
              <input type="text" name="characterName" class="ui" placeholder="Who are you?" v-model="characterName">
            </div>
          </div>
          <div class="four wide column">
            <img :src="avatarUrl !== null ? avatarUrl : 'http://placehold.it/120/120'" :alt="classData.name" :title="classData.name" class="ui centered small circular image">
            <input type="file" name="characterAvatar" id="" @change="onFilePicked" accept="image/*">
          </div>
          <div class="eight wide column">
            <p>{{ classData.flavorText }}</p>
          </div>
        </div>
      </div>
      <CharacterDrives v-bind:cClass="classId" @selected="selectDrive"></CharacterDrives>
      <CharacterBackgrounds v-bind:cClass="classId" @selected="selectBackground"></CharacterBackgrounds>
      <CharacterBonds v-bind:cClass="classId" v-bind:startingBonds="classData.startingBonds" @updatedBonds="updatedBonds"></CharacterBonds>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')
  import CharacterDrives from '@/components/Characters/CharacterDrives'
  import CharacterBackgrounds from '@/components/Characters/CharacterBackgrounds'
  import CharacterBonds from '@/components/Characters/CharacterBonds'

  export default {
    name: 'CharacterNew',
    data () {
      return {
        classId: this.$route.params.className,
        classData: '',
        baseClass: '',
        characterName: '',
        drive: {},
        background: {},
        bonds: [],
        avatarUrl: null,
        avatar: ''
      }
    },
    components: {
      CharacterDrives,
      CharacterBackgrounds,
      CharacterBonds
    },
    methods: {
      selectDrive (value) {
        this.drive = value
      },
      selectBackground (value) {
        this.background = value
      },
      updatedBonds (value) {
        this.bonds = value
      },
      onFilePicked (event) {
        const files = event.target.files
        console.log(files[0])
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid image!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.avatarUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.avatar = files[0]
      }
    },
    mounted () {
      firebase.firestore().doc('characters/baseClass').get()
        .then((doc) => {
          if (doc.exists) {
            this.baseClass = doc.data()
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
  .trigger {
    font-weight: bold
  }

</style>
