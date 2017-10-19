<template>
  <div class="row">
    <div class="ui stackable grid segment">
      <div class="sixteen wide column">
        <h3 class="ui header">Background
            <div class="sub header">Choose one or write your own</div>
          </h3>
      </div>
      <div class="ui four wide column">
        <div class="ui labeled input">
          <input type="text" v-model="currentBackground.title" placeholder="Background Title" @input="updateBackground">
        </div>
          <vue-editor v-model="currentBackground.text" :editorToolbar="customToolbar" placeholder="Background description" id="background-editor" @input="updateBackground"></vue-editor>
      </div>
      <div class="four wide column" v-for="(background, index) in backgrounds" v-bind:key="index">
        <div class="inline field">
          <div class="ui radio checkbox">
            <input type="radio" name="background" :value="background" v-model="selectedBackground" @change="selectBackground">
            <label for="background"><strong>{{ background.title }}</strong>
            <div v-html="background.text" v-if="background.text"></div></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')
  import { VueEditor } from 'vue2-editor'
  // import _ from 'lodash'

  export default {
    name: 'CharacterBackgrounds',
    props: ['cClass'],
    data () {
      return {
        backgrounds: [],
        selectedBackground: {},
        currentBackground: {},
        error: '',
        classId: this.cClass,
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'bullet' }]
        ]
      }
    },
    components: {
      VueEditor
    },
    methods: {
      selectBackground () {
        console.log(this.selectedBackground)
        this.currentBackground = { ...this.selectedBackground }
        this.$emit('selected', this.selectedBackground)
      },
      updateBackground () {
        this.$emit('updateBackground', this.currentBackground)
      }
    },
    mounted () {
      console.log(this.classId)
      firebase.firestore().collection('characters/' + this.classId + '/backgrounds').get()
        .then((querySnapshot) => {
          console.log(querySnapshot, 'characters/' + this.classId + '/backgrounds')
          querySnapshot.forEach((doc) => {
            this.backgrounds.push(doc.data())
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
#background-editor {
  height: 200px;
}
</style>
