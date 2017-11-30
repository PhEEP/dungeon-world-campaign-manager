<template>
  <v-flex
      xs12
      sm6
      md3
    >
      <h5>
        {{ this.name }}
      </h5>
      <v-text-field
        label="Limit"
        type="number"
        v-model="classEquipmentGroup.limit"
      >
      </v-text-field>
      <v-text-field
        label="Group text"
        v-model="classEquipmentGroup.text"
      >
      </v-text-field>
      <v-select
        :label="'Select equipment line ' + n"
        v-for="n in 5"
        :key="classEquipmentGroup.id + 'line' + n"
        v-bind:items="equipment"
        v-model="classEquipmentGroup.list[n-1]"
        item-text="name"
        item-value="id"
        multiple
        chips
        hint="What does the class start with?"
        autocomplete
      >
        <template slot="selection" slot-scope="data">
          <v-chip
            close
            @input="data.parent.selectItem(data.item)"
            :selected="data.selected"
            class="chip--select-multi"
            :key="JSON.stringify(data.item)"
          >
            {{ data.item.name }}
          </v-chip>
        </template>
      </v-select>
      <v-btn
        @click="saveEquipment(classEquipmentGroup)"
        color="success"
      >
        Save group
      </v-btn>
    </v-flex>
</template>

<script>
export default {
  name: 'CAEquipmentListItem',
  data () {
    return {}
  },
  props: ['name', 'id'],
  computed: {
    equipment () {
      return this.$store.getters['equipmentAdmin/equipment']
    },
    classEquipmentGroup () {
      return this.$store.getters['characterAdmin/equipment' + this.id]
    }
  },
  methods: {
    saveEquipment (val) {
      this.$store.dispatch('characterAdmin/save', {...val, collection: 'equipment'})
    }
  }
}
</script>

<style>

</style>
