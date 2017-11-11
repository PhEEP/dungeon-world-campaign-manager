<template>
  <v-container fluid grid-list-lg>
    <span v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </span>
    <v-layout row wrap>
      <v-flex md3>
        <CADetails />
      </v-flex>
      <v-flex md3>
        <CABackgrounds />
      </v-flex>
      <v-flex md3>
        <CADrives />
      </v-flex>
      <v-flex md3>
        <CABonds />
      </v-flex>
      <v-flex md3>
        <CALooks />
      </v-flex>
      <v-flex md3>
        <CAFlatStats />
      </v-flex>
    </v-layout>
    <v-btn fab fixed bottom right color="accent" @click="updateBaseInfo">
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
import CADetails from '@/components/CharactersAdmin/CADetails'
import CABonds from '@/components/CharactersAdmin/CABonds'
import CALooks from '@/components/CharactersAdmin/CALooks'
import CAFlatStats from '@/components/CharactersAdmin/CAFlatStats'
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
    }
  },
  components: {
    VueEditor,
    CABackgrounds,
    CADrives,
    CADetails,
    CABonds,
    CALooks,
    CAFlatStats
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
