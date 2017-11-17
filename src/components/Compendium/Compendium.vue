<template>
  <v-container fluid grid-list-lg>
    <v-btn
      color="secondary"
      dark
      @click="$router.push('/compendium/equipment')"
      v-if="userIsAdmin"
    >Equipment</v-btn>
    <v-btn
      color="accent"
      dark
      @click="$router.push('/compendium/equipment/admin')"
      v-if="userIsAdmin"
    >Manage</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Compendium',
  computed: {
    userIsAdmin () {
      return this.$store.getters.getUserRole
    }
  }
}
</script>

<style>

</style>
