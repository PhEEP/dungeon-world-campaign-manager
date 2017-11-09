<template>
  <v-layout column>
    <h5>Looks</h5>
    <v-flex v-for='category in categories' :key='category' >
      <h6>{{ startCase(category) }}</h6>
      <v-text-field
        v-model='looks[category]'
        @change.native='emitValue(category)'
      >
      </v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'CALooks',
  data () {
    return {
      categories: ['body', 'eyes', 'decoration', 'gender', 'race', 'garb']
    }
  },
  computed: {
    looks () {
      return this.$store.getters['characterAdmin/looks']
    }
  },
  methods: {
    startCase (str) {
      return _.startCase(str)
    },
    emitValue (val) {
      let newLook = {}
      newLook[val] = this.looks[val]
      console.log(newLook)
      this.$store.dispatch('characterAdmin/setLook', newLook)
    }
  }
}
</script>

<style>

</style>
