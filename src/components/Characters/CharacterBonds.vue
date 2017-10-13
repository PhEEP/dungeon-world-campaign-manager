<template>
<div class="row">
  <div class="ui stackable grid segment">
      <div class="sixteen wide column">
        <h3 class="ui header">Bonds
          <div class="sub header">Do this together with the group</div>
        </h3>
        <p>
          You start with {{ this.startingBonds }} bonds, divided between the other members of your party. Each is a statement about how you relate to them.
        </p>
      </div>
      <div class="sixteen wide column"  v-for="(bond, index) in bonds" v-bind:key="index">
        <div class="ui form">
          <div class="ui mini right labeled input">
            <div class="ui label" v-if="bond.beforeBond" v-text="bond.beforeBond"></div>
            <input type="text" class="ui bondTarget" placeholder="Someone McSomeone" v-model="bond.target" @input="updateBonds" :disabled="underBondLimit && !bond.target">
            <div class="ui label" v-if="bond.afterBond" v-text="bond.afterBond"></div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/firestore')
  import _ from 'lodash'

  export default {
    name: 'CharacterBonds',
    props: ['cClass', 'startingBonds'],
    data () {
      return {
        bonds: [],
        error: '',
        currentBonds: 0,
        classId: this.cClass
      }
    },
    methods: {
      updateBonds () {
        this.$emit('updatedBonds', this.bonds)
        this.currentBonds = _.filter(this.bonds, (o) => {
          return _.has(o, 'target') && o.target.length > 0
        }).length
      }
    },
    mounted () {
      firebase.firestore().collection('characters/' + this.classId + '/bonds').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.bonds.push(doc.data())
          })
        })
        .catch((error) => {
          console.log('error')
          this.error = error
        })
    },
    computed: {
      underBondLimit () {
        return this.currentBonds >= this.startingBonds
      }
    }
  }

</script>

<style scoped>
.bondTarget {
  border-top: transparent !important;
  max-width:200px !important;
}
</style>
