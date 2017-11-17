<template>
  <v-container
  fluid
  grid-list-lg
  >
    <span v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </span>
    <EquipmentList />
  </v-container>
</template>

<script>
import EquipmentList from '@/components/Compendium/EquipmentList'

export default {
  name: 'EquipmentView',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('equipmentAdmin/loadEquipment', true)
  },
  methods: {
    loadEquipment () {
      this.$store.dispatch('equipmentAdmin/loadEquipment', true)
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  components: {
    EquipmentList
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    },
    snackbar () {
      return this.$store.getters.snackbar
    }
  }
}
</script>

<style>

</style>
