<template>
  <v-container fluid grid-list-lg>
    <span v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </span>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h5>New Item</h5>
          </v-card-title>
          <v-card-text>
            <v-form
              v-model="valid"
              ref="form"
              lazy-validation
            >
            <v-layout row wrap>
                <v-flex
                  xs12
                  sm4
                >
                  <v-text-field
                    v-model="tempItem.name"
                    label="Item name"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                >
                  <v-text-field
                    v-model="tempItem.weight"
                    label="Item weight"
                    :rules="weightRules"
                    type="number"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                >
                  <v-text-field
                    v-model="tempItem.price"
                    label="Item price"
                    type="number"
                    :rules="priceRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    v-model="tempItem.tags"
                    label="Item tags, comma separated"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    v-model="tempItem.damage"
                    label="Item damage"
                    type="number"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    v-model="tempItem.piercing"
                    label="Item piercing"
                    type="number"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    v-model="tempItem.ammo"
                    label="Item ammo"
                    type="number"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click.native="saveItem"
              :disabled="!valid"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn
              @click="clear"
            >
              <v-icon>empty</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <EquipmentList />
    <v-dialog v-model="deleting" color="warning">
      <v-card>
        <v-alert color="warning" dark value="true"> Deleting is irreversible!</v-alert>
        <v-card-title primary-title>
          <h6 v-if="deleteTarget">Remove {{deleteTarget.id}} from {{deleteTarget.collection}} ?</h6>
        </v-card-title>
        <v-card-actions>
          <v-btn block raised color="success" @click.stop="cancelDelete">Go back</v-btn>
          <v-btn icon color="error" dark @click="confirmDelete"><v-icon>delete</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import EquipmentList from '@/components/Compendium/EquipmentList'

export default {
  name: 'EquipmentAdmin',
  data () {
    return {
      tempItem: {},
      baseItem: {
        name: '',
        weight: 0,
        price: 0,
        tags: [],
        damage: 0,
        armor: 0,
        piercing: 0
      },
      valid: false,
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length >= 2 || 'Name must be longer than 1 character'
      ],
      priceRules: [
        (v) => !!v || 'Price is required',
        (v) => typeof parseInt(v) === 'number' || 'Price must be an integer'
      ],
      weightRules: [
        (v) => !!v || 'Weight is required',
        (v) => typeof parseInt(v) === 'number' || 'Weight must be an integer'
      ]
    }
  },
  components: {
    EquipmentList
  },
  created () {
    this.$store.dispatch('equipmentAdmin/loadEquipment')
  },
  methods: {
    loadEquipment () {
      this.$store.dispatch('equipmentAdmin/loadEquipment')
    },
    confirmDelete () {
      this.$store.dispatch('equipmentAdmin/delete')
    },
    cancelDelete () {
      this.$store.dispatch('equipmentAdmin/promptDelete', false)
    },
    saveItem () {
      if (this.$refs.form.validate()) {
        let newItem = {...this.tempItem, id: this.$_.camelCase(this.tempItem.name)}
        if (newItem.tags) {
          newItem.tags = newItem.tags.split(',')
        }
        this.$store.dispatch('equipmentAdmin/add', newItem)
        this.tempItem = {...this.baseItem}
      }
    },
    clear () {
      this.$refs.form.reset()
      this.tempItem = {...this.baseItem}
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    },
    snackbar () {
      return this.$store.getters.snackbar
    },
    deleteTarget () {
      return this.$store.getters['equipmentAdmin/deleteTarget']
    },
    deleting: {
      get () {
        return this.$store.getters['equipmentAdmin/deleting']
      },
      set () {
        return this.$store.dispatch('equipmentAdmin/promptDelete', false)
      }
    }
  }
}
</script>

<style>

</style>
