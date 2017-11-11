<template>
  <v-layout column>
    <h4>Looks
      <v-btn
          icon
          @click="editingLooks = !editingLooks"
        >
        <v-icon>edit</v-icon>
      </v-btn>
    </h4>
    <v-flex v-for='category in categories' :key='category' >
      <h6>{{ startCase(category) }}</h6>
      <p v-if="!editingLooks">{{ looks[category] }}</p>
      <v-text-field
        v-model='looks[category]'
        @change.native='emitValue(category)'
        v-if="editingLooks"
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
      categories: ['body', 'eyes', 'decoration', 'gender', 'race', 'garb'],
      editingLooks: false
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
