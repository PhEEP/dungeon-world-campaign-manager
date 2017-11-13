<template>
  <v-container fluid grid-list-lg>
    <span v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </span>
    <h1>{{ name }}: {{ className }}</h1>
    <img :src="avatar" alt="" style="height:200px;">
    <v-layout row wrap>
      <v-flex v-if="background">
        <v-card>
          <v-card-title>
            {{ background.title }}
          </v-card-title>
          <v-card-text>
            <div v-html="background.text"></div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-if="drive">
        <v-card>
          <v-card-title>
            {{ drive.title }}
          </v-card-title>
          <v-card-text>
            <div v-html="drive.description"></div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'PlayerCharacter',
  data () {
    return {
      pcID: this.$route.params.id
    }
  },
  mounted () {
    this.$store.dispatch('playerCharacter/loadPC', { userID: this.userID, charID: this.pcID })
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    userID () {
      return this.$store.getters.user.id
    },
    name () {
      return this.$store.getters['playerCharacter/name']
    },
    className () {
      return this.$store.getters['playerCharacter/className']
    },
    background () {
      return this.$store.getters['playerCharacter/background']
    },
    drive () {
      return this.$store.getters['playerCharacter/drive']
    },
    avatar () {
      return this.$store.getters['playerCharacter/avatar']
    }
  }
}
</script>

<style>

</style>
