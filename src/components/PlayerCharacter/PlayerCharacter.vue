<template>
  <v-container fluid grid-list-md>
    <span v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </span>
    <PCDetails v-if="loaded"/>
  </v-container>
</template>

<script>
import PCDetails from '@/components/PlayerCharacter/PCDetails'
export default {
  name: 'PlayerCharacter',
  components: {
    PCDetails
  },
  data () {
    return {
      pcID: this.$route.params.id
    }
  },
  created () {
    this.$store.dispatch('playerCharacter/loadPC', { userID: this.userID, charID: this.pcID })
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    userID () {
      return this.$store.getters.user.id
    },
    loaded () {
      return this.$store.getters['playerCharacter/loaded']
    }
  }
}
</script>

<style>

</style>
