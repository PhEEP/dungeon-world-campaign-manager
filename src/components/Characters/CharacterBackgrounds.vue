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
          <textarea name="backgroundBeforeTrigger" rows="4" v-model="currentBackground.beforeTrigger" placeholder="Before Trigger"
          />
          <textarea name="backgroundTrigger" class="trigger" rows="4" v-model="currentBackground.trigger" placeholder="Trigger"></textarea>
          <textarea name="backgroundAfterTrigger" rows="4" v-model="currentBackground.afterTrigger" placeholder="After Trigger"></textarea>
      </div>
      <div class="four wide column" v-for="(background, index) in backgrounds" v-bind:key="index">
        <div class="inline field">
          <div class="ui radio">
            <input type="radio" name="background" :value="background" v-model="selectedBackground" @change="selectBackground">
            <label for="background"><strong>{{background.title}}</strong></label>
            <p>
              <span v-if="background.beforeTrigger">{{background.beforeTrigger}} </span>
              <span v-if="background.trigger"><strong>{{background.trigger}} </strong></span>
              <span v-if="background.afterTrigger">{{background.afterTrigger}}</span>
            </p>
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
