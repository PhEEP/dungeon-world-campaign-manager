<template>
  <v-container
  fluid
  grid-list-lg
  >
    <span v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </span>
    <v-layout
      v-if="equipment"
      row
      wrap
    >
      <v-flex
        v-for="(item, index) in equipment"
        :key="index"
        xs12
        sm6
        md3
      >
        <v-card>
          <v-card-title>
            <h5>{{ item.name }}</h5>
          </v-card-title>
            <v-list
              dense
            >
              <v-list-tile v-if="item.price">
                <v-list-tile-avatar>
                  <v-icon>toll</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.price }} coin</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="item.tags">
                <v-list-tile-avatar>
                  <v-icon>label</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title><span v-for="tag in item.tags" :key="index + tag">{{ startCase(tag) }} </span></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="item.weight">
                <v-list-tile-avatar>
                  <v-icon>work</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.weight }} weight</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="item.ammo">
                <v-list-tile-avatar>
                  <v-icon>font_download</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.ammo }} ammo</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="item.damage">
                <v-list-tile-avatar>
                  <v-icon>add</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.damage }} damage</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'EquipmentView',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('equipmentAdmin/loadEquipment')
  },
  methods: {
    loadEquipment () {
      this.$store.dispatch('equipmentAdmin/loadEquipment')
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    startCase (str) {
      return this.$_.startCase(str)
    }
  },
  computed: {
    equipment () {
      return this.$store.getters['equipmentAdmin/equipment']
    },
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
