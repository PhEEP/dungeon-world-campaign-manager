<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :pagination.sync="pagination"
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
      <td>{{ props.item.armor }}</td>
      <td>{{ props.item.tags }}</td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'EquipmentList',
  data () {
    return {
      pagination: {
        sortBy: 'name'
      },
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
