<template>
<div class="row">
  <div class="ui stackable grid">
      <div class="sixteen wide column">
        <h3 class="ui header">Bonds
          <div class="sub header">Do this together with the group</div>
        </h3>
        <p>
          You start with {{ startingBonds }} bonds, divided between the other members of your party. Each is a statement about how you relate to them.
        </p>
      </div>
      <div class="sixteen wide column"  v-for="(bond, index) in bonds" v-bind:key="index">
        <div class="ui form">
          <div class="ui right labeled input">
            <div class="ui label" v-if="bond.beforeBond">
              {{ bond.beforeBond }}
            </div>
            <input type="text" class="ui">
            <div class="ui label" v-if="bond.afterBond">
              {{ bond.afterBond }}
            </div>
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
    name: 'CharacterBonds',
    props: ['cClass', 'startingBonds'],
    data () {
      return {
        bonds: [],
        error: '',
        currentBonds: 0,
        startingBonds: this.startingBonds,
        classId: this.cClass
      }
    },
    methods: {
      selectDrive () {
        this.$emit('selected', this.selectedDrive)
      }
    },
    mounted () {
      console.log(this.classId)
      firebase.firestore().collection('characters/' + this.classId + '/bonds').get()
        .then((querySnapshot) => {
          console.log(querySnapshot, 'characters/' + this.classId + '/bonds')
          querySnapshot.forEach((doc) => {
            this.bonds.push(doc.data())
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
