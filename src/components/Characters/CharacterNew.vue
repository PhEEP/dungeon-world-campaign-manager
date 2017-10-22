<template>
  <v-container fluid grid-list-lg>
    <h1 class="display-2">{{ characterName }} <h1 class="subheading"> {{ classData.name }}</h1></h1>
    <v-layout row wrap>
      <v-flex md6 lg3 v-if="typeof baseClass !== 'string'">
        <v-text-field label="Name" placeholder="Who are you?" v-model="characterName"></v-text-field>
        <em v-if="classData.exampleNames">{{ classData.exampleNames }}</em>
        <div class="four wide column">
          <img :src="avatarUrl !== null ? avatarUrl : 'http://placehold.it/120/120'" :alt="classData.name" :title="classData.name" class="ui centered small circular image">
          <input type="file" name="characterAvatar" id="" @change="onFilePicked" accept="image/*">
        </div>
          <p>{{ classData.flavorText }}</p>
        </div>
      </v-flex>
      <v-flex md6 lg3>
        <CharacterDrives v-bind:cClass="classId" @selected="selectDrive" @updateDrive="updatedDrive" :disabled="submitting"></CharacterDrives>
      </v-flex>
      <v-flex md6 lg3>
        <CharacterBackgrounds v-bind:cClass="classId" @selected="selectBackground" @updateBackground="updatedBackground"></CharacterBackgrounds>
      </v-flex>
      <v-flex md6 lg3>
        <CharacterLooks v-bind:classLook="classData.look" @updateLook="updatedLook"></CharacterLooks>
      </v-flex>
      <v-btn block color="primary" @click="saveCharacter" :disabled="submitting || aboveCharacterCount">
        Save
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')
  import CharacterDrives from '@/components/Characters/CharacterDrives'
  import CharacterBackgrounds from '@/components/Characters/CharacterBackgrounds'
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
        characterCount: 0,
        look: '',
        avatarUrl: null,
        avatar: '',
        submitting: false
      }
    },
    components: {
      CharacterDrives,
      CharacterBackgrounds,
      CharacterLooks
    },
    computed: {
      aboveCharacterCount () {
        return this.characterCount >= 5
      }
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
          look: this.look,
          className: this.classData.name,
          classId: this.classId
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
            this.submitting = false
            console.log(error)
          })
      }
    },
    mounted () {
      let user = firebase.auth().currentUser
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
      firebase.firestore().collection('users/' + user.uid + '/characters').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.characterCount++
          })
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
