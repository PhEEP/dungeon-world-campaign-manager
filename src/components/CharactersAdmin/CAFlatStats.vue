<template>
  <v-layout column>
    <v-card>
      <v-card-text>

        <v-text-field
          type="number"
          label="Starting Bond Limit"
          placeholder="#"
          v-model="startingBonds"
        >
        </v-text-field>
        <v-text-field
          type="number"
          label="Maximum Load"
          placeholder="#"
          v-model="maximumLoad"
        >
        </v-text-field>
        <v-text-field
          type="number"
          label="Maximum HP"
          placeholder="#"
          v-model="maximumHP"
        >
        </v-text-field>
        <v-text-field
          type="number"
          label="Damage Mod"
          placeholder="#"
          v-model="damageMod"
        >
        </v-text-field>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'CAFlatStats',
  data () {
    return {}
  },
  computed: {
    startingBonds: {
      get () {
        return this.$store.getters['characterAdmin/startingBonds']
      },
      set (val) {
        this.$store.dispatch('characterAdmin/setStartingBonds', val)
      }
    },
    maximumLoad: {
      get () {
        return this.$store.getters['characterAdmin/maximumLoad']
      },
      set (val) {
        this.$store.dispatch('characterAdmin/setMaximumLoad', val)
      }
    },
    maximumHP: {
      get () {
        return this.$store.getters['characterAdmin/maximumHP']
      },
      set (val) {
        this.$store.dispatch('characterAdmin/setMaximumHP', val)
      }
    },
    damageMod: {
      get () {
        return this.$store.getters['characterAdmin/damageMod']
      },
      set (val) {
        this.$store.dispatch('characterAdmin/setDamageMod', val)
      }
    }
  }
}
</script>

<style>

</style>
