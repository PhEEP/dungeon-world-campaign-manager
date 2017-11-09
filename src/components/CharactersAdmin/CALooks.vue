<template>
  <v-layout column>
    <h5>Looks</h5>
    <v-flex v-for="(category, index) in categories" :key="index" >
      <h6>{{ startCase(index) }}</h6>
      <v-text-field
        textarea
        v-model="categories[category]"
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
      categories: {
        body: this.looks['body'],
        eyes: this.looks['eyes'],
        decoration: this.looks['decoration'],
        gender: this.looks['gender'],
        race: this.looks['race'],
        garb: this.looks['garb']
      }
    }
  },
  computed: {
    looks: {
      get () {
        return this.$store.getters['characterAdmin/looks']
      },
      set (val) {
        this.$store.dispatch('characterAdmin/setLooks', val)
      }
    }
  },
  methods: {
    startCase (str) {
      return _.startCase(str)
    }
  }
}
</script>

<style>

</style>
