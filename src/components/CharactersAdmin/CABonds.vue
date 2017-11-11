<template>
  <v-layout column wrap>
    <v-flex xs12>
      <h4 block>Bonds</h4>
      <v-text-field
        type="number"
        label="Starting Bond Limit"
        placeholder="#"
        v-model="startingBonds"
      >
      </v-text-field>
    </v-flex>
    <v-flex card>
      <v-text-field v-model="tempBond" label="Bond" ></v-text-field>
      <v-btn color="secondary" dark @click="addBond">Add bond</v-btn>
    </v-flex>
    <v-flex v-for="(bond, index) in bonds" :key="index">
      <v-layout>
        <v-text-field :value="bond"></v-text-field>
        <v-btn
          icon
          fab
          small
          dark
          color="warning"
          @click.stop="removeBond(bond)"
      ><v-icon>delete</v-icon></v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'CABonds',
  data () {
    return {
      tempBond: ''
    }
  },
  computed: {
    bonds () {
      return this.$store.getters['characterAdmin/bonds']
    },
    startingBonds: {
      get () {
        return this.$store.getters['characterAdmin/startingBonds']
      },
      set (val) {
        this.$store.dispatch('characterAdmin/setStartingBonds', val)
      }
    }
  },
  methods: {
    addBond () {
      this.$store.dispatch('characterAdmin/addBond', this.tempBond)
      this.tempBond = ''
    },
    removeBond (bond) {
      this.$store.dispatch('characterAdmin/removeBond', bond)
    }
  }
}
</script>

<style>

</style>
