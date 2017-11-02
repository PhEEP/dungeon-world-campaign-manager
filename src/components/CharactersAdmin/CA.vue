<template>
  <v-container fluid grid-list-lg>
    <span v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </span>
    <v-layout row wrap>
      <v-flex md4>
        <v-text-field v-model="name" label="Class Name" ></v-text-field>
      </v-flex>
      <v-flex md8>
        <h5>Example Names <v-btn fab flat small icon @click="editingExampleNames = !editingExampleNames"><v-icon>edit</v-icon></v-btn></h5>
        <div class="body-1" v-html="exampleNames" v-if="!editingExampleNames"></div>
        <v-text-field textarea label="Example Names" v-model="exampleNames" v-if="editingExampleNames"></v-text-field>
      </v-flex>
      <v-flex md12>
        <h5>Flavor Text <v-btn fab flat small icon @click="editingFlavorText = !editingFlavorText"><v-icon>edit</v-icon></v-btn></h5>
        <div class="body-1" v-html="flavorText" v-if="!editingFlavorText" ></div>
        <vue-editor id="caFlavorText" v-model="flavorText" :editorToolbar="customToolbar" v-if="editingFlavorText"></vue-editor>
      </v-flex>
    </v-layout>
    <CABackgrounds></CABackgrounds>
    <CADrives></CADrives>
    <h3 block>Bonds</h3>
    <v-layout row wrap v-if="bonds">
      <v-flex xs12 sm6 v-for="(bond, index) in bonds" :key="index">
        <v-text-field :value="bond"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 card>
        <v-text-field v-model="tempBond" label="Bond" ></v-text-field>
        <v-btn color="secondary" dark @click="addBond">Add bond</v-btn>
      </v-flex>
    </v-layout>

    <v-btn fab fixed bottom right color="primary" dark @click="updateBaseInfo">
      <v-icon>save</v-icon>
    </v-btn>
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
import CABackgrounds from '@/components/CharactersAdmin/CABackgrounds'
import CADrives from '@/components/CharactersAdmin/CADrives'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'CharactersAdmin',
  data () {
    return {
      tempBond: '',
      startingBonds: 0,
      customToolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'bullet'}]
      ],
      editingFlavorText: false,
      editingExampleNames: false,
      snackbarObj: {
        timeout: 5000,
        color: 'primary'
      }
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
      return this.$store.getters['characterAdmin/deleteTarget']
    },
    deleting: {
      get () {
        return this.$store.getters['characterAdmin/deleting']
      },
      set () {
        return this.$store.dispatch('characterAdmin/promptDelete', false)
      }
    },
    name: {
      get () {
        return this.$store.getters['characterAdmin/name']
      },
      set (newName) {
        this.$store.dispatch('characterAdmin/setName', newName)
      }
    },
    exampleNames: {
      get () {
        return this.$store.getters['characterAdmin/exampleNames']
      },
      set (val) {
        this.$store.dispatch('characterAdmin/setExampleNames', val)
      }
    },
    flavorText: {
      get () {
        return this.$store.getters['characterAdmin/flavorText']
      },
      set (val) {
        this.$store.dispatch('characterAdmin/setFlavorText', val)
      }
    },
    bonds () {
      return this.$store.getters['characterAdmin/bonds']
    }
  },
  components: {
    VueEditor,
    CABackgrounds,
    CADrives
  },
  props: ['classId'],
  created () {
    this.$store.dispatch('characterAdmin/loadClassData', this.classId)
  },
  mounted () {
  },
  methods: {
    updateBaseInfo () {
      this.$store.dispatch('characterAdmin/updateBaseInfo')
    },
    addBond () {
      this.bonds.push(this.tempBond)
      this.tempBond = ''
    },
    confirmDelete () {
      this.$store.dispatch('characterAdmin/delete')
    },
    cancelDelete () {
      this.$store.dispatch('characterAdmin/promptDelete', false)
    }
  }
}
</script>

<style>

</style>
