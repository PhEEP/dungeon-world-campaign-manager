<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-avatar
        size="100px"
        tile
      >
        <img :src="avatar" alt="Player Character Avatar">
      </v-avatar>
    </v-flex>
    <v-flex xs8>
      <h3>{{ name }} <h3 class="subheading">{{ className }}</h3></h3>
    </v-flex>
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
</template>

<script>
export default {
  name: 'PCDetails',
  computed: {
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
