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
    <v-flex xs12 sm6 md3>
      <h5>
        Starting Equipment
      </h5>
      <v-select
        label="Select"
        v-bind:items="equipment"
        v-model="classEquipment.base"
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
    </v-flex>
    <v-flex xs12 sm6 md3>
      <h5>
        Group 1
      </h5>
      <v-text-field
        label="How many?"
        type="number"
        v-model="classEquipment.group1.limit"
      >
      </v-text-field>
      <v-text-field
        label="Group text"
        v-model="classEquipment.group1.text"
      >

      </v-text-field>
      <v-select
        label="Select"
        v-bind:items="equipment"
        v-model="classEquipment.group1.options"
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
    </v-flex>
    <v-flex xs12 sm6 md3>
      <h5>
        Group 2
      </h5>
      <v-text-field
        label="How many?"
        type="number"
        v-model="classEquipment.group2.limit"
      >
      </v-text-field>
      <v-text-field
        label="Group text"
        v-model="classEquipment.group2.text"
      >
      </v-text-field>
      <v-select
        label="Select"
        v-bind:items="equipment"
        v-model="classEquipment.group2.options"
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
    </v-flex>
    <v-flex xs12 sm6 md3>
      <h5>
        Group 3
      </h5>
      <v-text-field
        label="How many?"
        type="number"
        v-model="classEquipment.group3.limit"
      >
      </v-text-field>
      <v-text-field
        label="Group text"
        v-model="classEquipment.group3.text"
      >
      </v-text-field>
      <v-select
        label="Select"
        v-bind:items="equipment"
        v-model="classEquipment.group3.options"
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
    </v-flex>
  </v-layout>

  </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CAEquipment',
  data () {
    return {
      classEquipment: {
        base: [],
        group1: {},
        group2: {},
        group3: {}
      }
    }
  },
  created () {
    this.$store.dispatch('equipmentAdmin/loadEquipment')
  },
  computed: {
    equipment () {
      return this.$store.getters['equipmentAdmin/equipment']
    }
  }
}
</script>

<style>

</style>
