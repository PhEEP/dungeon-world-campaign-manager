<template>
  <v-container fluid grid-list-lg>
    <span v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </span>
    <v-dialog v-model="deleting" color="warning">
      <v-card>
        <v-alert color="warning" dark value="true"> Deleting is irreversible!</v-alert>
        <v-card-title primary-title>
          <h6 v-if="deleteTarget">Remove {{deleteTarget.id}} from {{deleteTarget.collection}} ?</h6>
        </v-card-title>
        <v-card-actions>
          <v-btn block raised color="success" @click.stop="cancelDelete">Go back</v-btn>
          <v-btn icon color="error" dark @click="confirmDelete"><v-icon>delete</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'EquipmentAdmin',
  data() {
    return {

    }
  },
  mounted () {
    this.loadEquipment()
  },
  methods: {
    loadEquipment () {
      this.$store.dispatch('equipmentAdmin/loadEquipment')
    }
  },
  computed: {
    equipment () {
      this.$store.getters['equipmentAdmin/equipment']
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    },
    snackbar () {
      return this.$store.getters.snackbar
    },
    deleteTarget () {
      return this.$store.getters['characterAdmin/deleteTarget']
    },
    deleting: {
      get () {
        return this.$store.getters['characterAdmin/deleting']
      },
      set () {
        return this.$store.dispatch('characterAdmin/promptDelete', false)
      }
    }
  }
}
</script>

<style>

</style>
