<template>
  <div>
    <div class="ui main container">
      <h1 class="header">{{ classData.name }} : {{ characterName }}</h1>
      <div class="ui stackable grid" v-if="typeof baseClass !== 'string'">
        <div class="four wide column">
          <img src="http://placehold.it/120/120" alt="" class="ui centered circular medium image">
        </div>
        <div class="twelve wide column">
          <p>{{ classData.flavorText }}</p>
        </div>
        <div class="four wide column">
          <div class="ui labeled input">
            <div class="ui label">
              Name
            </div>
            <input type="text" name="characterName" class="ui" placeholder="Who are you?" v-model="characterName">
          </div>
        </div>
        <div class="four wide column">
          <h3 class="ui header">Drive
            <div class="sub header">Choose one or write your own</div>
          </h3>
          <div class="ui four wide column">
            <div class="ui labeled input">
              <input type="text" v-model="drive.title" :placeholder="baseClass.drive.title">
            </div>
            <div class="ui form">
              <div class="field">
                <textarea rows="4" v-model="drive.description" :placeholder="baseClass.drive.description"/>
              </div>
              <CharacterDrives
                v-bind:cClass="classId"
                @selected="selectDrive">
              </CharacterDrives>
            </div>
          </div>
        </div>
        <div class="ui four wide column">
          <h3 class="ui header">
            Background
            <div class="sub header">Choose one or write your own</div>
          </h3>
          <div class="ui labeled input">
            <input type="text" v-model="background.title" :placeholder="baseClass.background.title">
          </div>
          <div class="ui form">
              <textarea name="backgroundBeforeTrigger" rows="4" v-model="background.beforeTrigger" :placeholder="baseClass.background.beforeTrigger" />
              <textarea name="backgroundTrigger" class="trigger" rows="4" v-model="background.trigger" :placeholder="baseClass.background.trigger"></textarea>
              <textarea name="backgroundAfterTrigger" rows="4" v-model="background.afterTrigger" :placeholder="baseClass.background.afterTrigger"></textarea>
          </div>
          <CharacterBackgrounds
            v-bind:cClass="classId"
            @selected="selectBackground">
          </CharacterBackgrounds>
        </div>
        <div class="ui four wide column">
          <div class="ui labeled input">
            <div class="ui label">
              Armour
            </div>
            <input type="number" name="armour" class="ui" :placeholder="baseClass.armour" disabled>
          </div>
          <div class="ui labeled input">
            <div class="ui label">
              Coins
            </div>
            <input type="number" name="coins" class="ui" :placeholder="baseClass.coins">
          </div>
        </div>
        <div class="ui eight wide column">
          <pre>
            {{ baseClass }}
          </pre>
        </div>
        <div class="ui eight wide column">
          <pre>
            {{ classData }}
          </pre>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')
  import CharacterDrives from '@/components/Characters/CharacterDrives'
  import CharacterBackgrounds from '@/components/Characters/CharacterBackgrounds'
  export default {
    name: 'CharacterNew',
    data () {
      return {
        classId: this.$route.params.className,
        classData: '',
        baseClass: '',
        characterName: '',
        drive: {},
        background: {}
      }
    },
    components: {
      CharacterDrives,
      CharacterBackgrounds
    },
    methods: {
      selectDrive (value) {
        this.drive = value
      },
      selectBackground (value) {
        this.background = value
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
  font-weight:bold;
}
</style>

