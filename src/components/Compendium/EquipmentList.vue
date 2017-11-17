<template>
<v-card>
    <v-card-title>
      Equipment
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
  <v-data-table
    :headers="headers"
    :items="items"
    :pagination.sync="pagination"
    :search="search"
  >
    <template
      slot="items"
      slot-scope="props"
    >
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.weight }}</td>
      <td>{{ props.item.price }}</td>
      <td>{{ props.item.damage }}</td>
      <td>{{ props.item.piercing }}</td>
      <td>{{ props.item.ammo }}</td>
      <td>{{ props.item.uses }}</td>
      <td>{{ props.item.armor }}</td>
      <td>{{ props.item.tags }}</td>
      <td>{{ props.item.text }}</td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
export default {
  name: 'EquipmentList',
  data () {
    return {
      pagination: {
        sortBy: 'name'
      },
      search: '',
      headers: [
        {
          text: 'Item Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Weight',
          align: 'left',
          sortable: true,
          value: 'weight'
        },
        {
          text: 'Price',
          align: 'left',
          sortable: true,
          value: 'price'
        },
        {
          text: 'Damage',
          align: 'left',
          sortable: true,
          value: 'damage'
        },
        {
          text: 'Piercing',
          align: 'left',
          sortable: true,
          value: 'piercing'
        },
        {
          text: 'Ammo',
          align: 'left',
          sortable: true,
          value: 'ammo'
        },
        {
          text: 'Uses',
          align: 'left',
          sortable: true,
          value: 'uses'
        },
        {
          text: 'Armor',
          align: 'left',
          sortable: true,
          value: 'armor'
        },
        {
          text: 'Tags',
          align: 'left',
          sortable: true,
          value: 'tags'
        },
        {
          text: 'Description',
          align: 'left',
          sortable: true,
          value: 'text'
        }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.getters['equipmentAdmin/equipment']
    }
  },
  methods: {
    startCase (str) {
      return this.$_.startCase(str)
    }
  }
}
</script>

<style>

</style>
