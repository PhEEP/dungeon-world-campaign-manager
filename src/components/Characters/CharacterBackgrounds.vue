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
          <input type="text" v-model="currentBackground.title" placeholder="Background Title">
        </div>
          <textarea name="background" rows="6" v-model="currentBackground.text" id="backgroundText"></textarea>
      </div>
      <div class="four wide column" v-for="(background, index) in backgrounds" v-bind:key="index">
        <div class="inline field">
          <div class="ui radio checkbox">
            <input type="radio" name="background" :value="background" v-model="selectedBackground" @change="selectBackground">
            <label for="background"><strong>{{background.title}}</strong></label>
            <div v-html="markDown(background.text)" v-if="background.text"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')
  import marked from 'marked'
  import _ from 'lodash'

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  })

  export default {
    name: 'CharacterBackgrounds',
    props: ['cClass'],
    data () {
      return {
        backgrounds: [],
        selectedBackground: {},
        currentBackground: {},
        error: '',
        classId: this.cClass
      }
    },
    methods: {
      selectBackground () {
        this.currentBackground = { ...this.selectedBackground }
        this.$emit('selected', this.selectedBackground)
      },
      markDown (text) {
        let newText = _.unescape(text)
        console.log(newText)
        return marked(_.unescape(text), { sanitize: true })
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

</style>
