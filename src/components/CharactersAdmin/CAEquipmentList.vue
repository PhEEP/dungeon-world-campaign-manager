<template>
<v-card>
  <v-card-text>
    <pre>
      // @TODO convert this to modular system
      // track number of multi-selects and dynamically add new ones
      // use vuex for state management
    </pre>
    <v-layout row wrap>
      <v-flex xs12>
        <h4>
          Equipment
        </h4>
      </v-flex>
      <CAEquipmentListItem
        v-for="(item, index) in equipmentItems"
        :key="item.name + index"
        :id="item.id"
        :name="item.name"
      />
  </v-layout>
  </v-card-text>
</v-card>
</template>

<script>
import CAEquipmentListItem from '@/components/CharactersAdmin/CAEquipmentListItem'

export default {
  name: 'CAEquipment',
  components: {
    CAEquipmentListItem
  },
  data () {
    return {
      equipmentItems: [
        {name: 'Starting Equipment', id: 'startingEquipment'},
        {name: 'Group 1', id: 'group1'},
        {name: 'Group 2', id: 'group2'},
        {name: 'Group 3', id: 'group3'}
      ],
      equipmentPerLine: 5
    }
  },
  created () {
    this.$store.dispatch('equipmentAdmin/loadEquipment')
  },
  computed: {
    equipmentLoaded () {
      return this.$store.getters['equipmentAdmin/equipmentLoaded']
    }
  }
}
</script>

<style>

</style>
