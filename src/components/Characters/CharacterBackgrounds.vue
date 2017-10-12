<template>
  <div class="ui three column grid">
    <div class="row">
      <div class="column" v-for="(background, index) in backgrounds" v-bind:key="index">
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
        error: '',
        classId: this.cClass
      }
    },
    methods: {
      selectBackground () {
        console.log(this.selectedBackground)
        this.$emit('selected', this.selectedBackground)
      }
    },
    mounted () {
      console.log(this.classId)
      firebase.firestore().collection('characters/' + this.classId + '/background').get()
        .then((querySnapshot) => {
          console.log(querySnapshot, 'characters/' + this.classId + '/background')
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
