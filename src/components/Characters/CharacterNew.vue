<template>
  <v-container fluid grid-list-lg>
      <v-alert
        :value="true"
        v-if="aboveCharacterCount"
        color="info"
      >
      Not sure how you got here, but you're above the Character Limit!
    </v-alert>
    <v-layout row wrap v-if="!aboveCharacterCount">
      <v-flex md4 v-if="typeof baseClass !== 'string'">
        <v-card>
          <v-card-title>
            <h1 class="display-2">{{ characterName }} <h1 class="subheading"> {{ classData.name }}</h1></h1>
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Name"
              placeholder="Who are you?"
              v-model="characterName"
              :error-messages="errors.collect('Character Name')"
              v-validate="'required'"
              data-vv-name="Character Name"
              required
            ></v-text-field>
            <div class="mb-2">
              <em v-if="classData.exampleNames">{{ classData.exampleNames }}</em>
            </div>
        <!-- <v-layout column wrap>
          <v-card-media :src="avatarUrl" height="200px" contain>
          </v-card-media>
          <v-btn color="primary" block @click="onPickFile">Add Image</v-btn>
          <input style="display:none;" type="file" name="characterAvatar" id="" @change="onFilePicked" accept="image/*" ref="avatarInput">
        </v-layout> -->
            <div v-html="classData.flavorText"></div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4>
        <v-card>
          <v-card-title>
            <h5 class="title">Drive
              <h5 class="subheading">Choose one or write your own</h5>
            </h5>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="drive.title"
              label="Drive Title"
              :error-messages="errors.collect('Drive Title')"
              v-validate="'required'"
              data-vv-name="Drive Title"
              required
            ></v-text-field>
            <v-alert v-show="errors.has('Drive Description')" color="error">{{ errors.first('Drive Description') }}</v-alert>
            <v-text-field
              multi-line
              v-model="drive.description"
              label="Drive Description"
              :error-messages="errors.collect('Drive Description')"
              data-vv-name="Drive Description"
              v-validate="'required'"
              required
            ></v-text-field>
            <CharacterDrives
              v-bind:cClass="classId"
              @selected="selectDrive"
              :disabled="submitting"
            ></CharacterDrives>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4>
        <v-card>
          <v-card-title>
            <h5 class="title">Background
              <h5 class="subheading">Choose one or write your own</h5>
            </h5>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="background.title"
              label="Background Title"
              v-validate="'required'"
              :error-messages="errors.collect('Background Title')"
              data-vv-name="Background Title"
              required
            ></v-text-field>
            <v-alert v-show="errors.has('Background Description')" color="error">{{ errors.first('Background Description') }}</v-alert>
            <vue-editor
              v-model="background.text"
              :editorToolbar="customToolbar"
              placeholder="Background description"
              id="background-editor"
            ></vue-editor>
            <v-text-field
              textarea
              style="display:none;"
              v-model="background.text"
              v-validate="'required'"
              data-vv-name="Background Description"
              :has-error="errors.has('Background Description')"
              required
            ></v-text-field>
            <CharacterBackgrounds v-bind:cClass="classId" @selected="selectBackground" @updateBackground="updatedBackground"></CharacterBackgrounds>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h5 class="title">Look
              <div class="subheading"> Pick as many that apply</div>
            </h5>
          </v-card-title>
          <v-card-text>
            <vue-editor :editorToolbar="customToolbar" placeholder="What do you look like?" id="looks-editor" v-model="look"></vue-editor>
            <CharacterLooks v-bind:classLook="classData.look" @updateLook="updatedLook"></CharacterLooks>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-btn
        fab
        fixed
        bottom
        right
        icon
        :color="errors.items.length > 0 ? 'error' : 'accent'"
        @click="saveCharacter"
        :disabled="submitting || aboveCharacterCount"
      >
        <v-icon>save</v-icon>
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
  import { VueEditor } from 'vue2-editor'

  export default {
    name: 'CharacterNew',
    data () {
      return {
        classData: '',
        baseClass: '',
        characterName: '',
        drive: {},
        background: {},
        characterCount: 0,
        look: '',
        avatarUrl: null,
        avatar: '',
        submitting: false,
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'bullet' }]
        ]
      }
    },
    props: ['classId'],
    components: {
      CharacterDrives,
      CharacterBackgrounds,
      CharacterLooks,
      VueEditor
    },
    computed: {
      aboveCharacterCount () {
        return this.characterCount >= 4
      }
    },
    methods: {
      selectDrive (value) {
        this.drive = {...value}
      },
      selectBackground (value) {
        this.background = {...value}
      },
      updatedBackground (value) {
        this.background = value
      },
      updatedLook (value) {
        this.look = value.join(', ')
      },
      onPickFile () {
        this.$refs.avatarInput.click()
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
        // @TODO PREVENT SAVE IF CHARACTER LIMIT REACHED
        this.submitting = true
        this.$validator.validateAll().then((result) => {
          if (result) {
            let user = firebase.auth().currentUser
            let userId = user.uid
            let newChar = {
              name: this.characterName,
              drive: this.drive,
              background: this.background,
              look: this.look,
              className: this.classData.name,
              classId: this.classId,
              classIcon: this.classData.classIcon,
              sampleBonds: this.classData.sampleBonds,
              maximumHP: this.classData.maximumHP,
              maximumLoad: this.classData.maximumLoad,
              startingBonds: this.classData.startingBonds,
              damageMod: this.classData.damageMod
            }
            let docId
            firebase.firestore().collection('users/' + userId + '/characters').add(newChar)
              .then((docRef) => {
                docId = docRef.id
                return docId
              })
              .then(docId => {
                if (typeof this.avatar.name === 'undefined') {
                  return null
                }
                const filename = this.avatar.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('characters/' + docId + ext).put(this.avatar)
              })
              .then(fileData => {
                let imageUrl = this.classData.classIcon.iconUrl
                if (fileData !== null) {
                  imageUrl = fileData.metadata.downloadURLs[0]
                }
                return firebase.firestore().doc('users/' + userId + '/characters/' + docId).update({avatarUrl: imageUrl})
              })
              .then(() => {
                this.$router.push({ name: 'PlayerCharacter', params: {id: docId} })
              })
              .catch((error) => {
                this.submitting = false
                console.log(error)
              })
            return
          }
          this.submitting = false
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
  .quillWrapper * {
    font-family: Roboto;
  }
</style>
