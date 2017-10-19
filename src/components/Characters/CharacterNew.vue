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
            <em v-if="classData.exampleNames">{{ classData.exampleNames }}</em>
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
      <CharacterDrives v-bind:cClass="classId" @selected="selectDrive" @updateDrive="updatedDrive" :disabled="submitting"></CharacterDrives>
      <CharacterBackgrounds v-bind:cClass="classId" @selected="selectBackground" @updateBackground="updatedBackground"></CharacterBackgrounds>
      <CharacterBonds v-bind:cClass="classId" v-bind:startingBonds="classData.startingBonds" @updatedBonds="updatedBonds"></CharacterBonds>
      <CharacterLooks v-bind:classLook="classData.look" @updateLook="updatedLook"></CharacterLooks>
      <button class="ui primary button" @click="saveCharacter" :disabled="submitting">
        Save
      </button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')
  import CharacterDrives from '@/components/Characters/CharacterDrives'
  import CharacterBackgrounds from '@/components/Characters/CharacterBackgrounds'
  import CharacterBonds from '@/components/Characters/CharacterBonds'
  import CharacterLooks from '@/components/Characters/CharacterLooks'

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
        look: '',
        avatarUrl: null,
        avatar: '',
        submitting: false
      }
    },
    components: {
      CharacterDrives,
      CharacterBackgrounds,
      CharacterBonds,
      CharacterLooks
    },
    methods: {
      selectDrive (value) {
        this.drive = value
      },
      updatedDrive (value) {
        this.drive = value
      },
      selectBackground (value) {
        this.background = value
      },
      updatedBackground (value) {
        this.background = value
      },
      updatedBonds (value) {
        this.bonds = value
      },
      updatedLook (value) {
        this.look = value
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
      },
      saveCharacter () {
        this.submitting = true
        let user = firebase.auth().currentUser
        let userId = user.uid
        let newChar = {
          name: this.characterName,
          drive: this.drive,
          background: this.background,
          bonds: this.bonds,
          look: this.look,
          className: this.classData.name
        }
        let imageUrl
        let docId
        firebase.firestore().collection('users/' + userId + '/characters').add(newChar)
          .then((docRef) => {
            docId = docRef.id
            return docId
          })
          .then(docId => {
            const filename = this.avatar.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref('characters/' + docId + ext).put(this.avatar)
          })
          .then(fileData => {
            imageUrl = fileData.metadata.downloadURLs[0]
            return firebase.firestore().doc('users/' + userId + '/characters/' + docId).update({avatarUrl: imageUrl})
          })
          .then(() => {
            this.$router.push({ name: 'Character', params: {id: docId} })
          })
          .catch((error) => {
            console.log(error)
          })
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
  .quillWrapper * {
    font-family: Lato;
  }
</style>
