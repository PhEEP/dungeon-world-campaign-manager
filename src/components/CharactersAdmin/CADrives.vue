
<template>
<v-layout column wrap>
  <v-flex xs12>
    <h4>Drives
      <v-btn
        icon
        @click="editingDrive = !editingDrive"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="addingDrive = !addingDrive"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </h4>
  </v-flex>
  <v-flex  v-for="(drive, index) in drives" :key="index">
    <div v-if="!editingDrive">
      <h5>{{ drive.title }}</h5>
      <p class="subheading" v-html="drive.description"></p>
    </div>
    <v-card v-if="editingDrive">
      <v-card-text>
        <v-text-field
          v-model="drive.title"
          label="Drive title"
        ></v-text-field>
        <v-text-field
          v-model="drive.description"
          label="Drive Description"
          textarea
        >
        </v-text-field>
        <v-layout>
            <v-btn
              color="accent"
              @click="saveDrive(drive)"
            >
            <v-icon>save</v-icon>
              Save
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              color="warning"
              @click="driveToDelete = drive.id, promptDelete()"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-layout>
      </v-card-text>
    </v-card>
  </v-flex>
    <v-flex  card v-if="addingDrive">
      <v-text-field v-model="tempDrive.title" label="Drive Title" ></v-text-field>
      <v-text-field textarea id="tempDrive" v-model="tempDrive.description" label="Drive Text"></v-text-field>
      <v-btn color="secondary" dark @click="addDrive">Add drive</v-btn>
    </v-flex>
</v-layout>
</template>

<script>
export default {
  data () {
    return {
      tempDrive: {
        title: '',
        description: ''
      },
      editingDrive: false,
      addingDrive: false,
      driveToDelete: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{'list': 'bullet'}]
      ]
    }
  },
  computed: {
    drives () {
      return this.$store.getters['characterAdmin/drives']
    },
    deleting () {
      return this.$store.getters['characterAdmin/deleting']
    }
  },
  methods: {
    addDrive () {
      this.$store.dispatch('characterAdmin/add', {...this.tempDrive, collection: 'drives'})
      this.tempDrive = this.$_.mapValues(this.tempDrive, (o) => { return '' })
    },
    saveDrive (drive) {
      this.$store.dispatch('characterAdmin/save', {...drive, collection: 'drives'})
    },
    promptDelete () {
      this.$store.commit('characterAdmin/promptDelete', true)
      this.$store.commit('characterAdmin/setDeleteTarget', { id: this.driveToDelete, collection: 'drives' })
    },
    confirmDelete () {
      this.$store.dispatch('characterAdmin/delete')
    },
    cancelDelete () {
      this.$store.commit('characterAdmin/promptDelete', false)
    }
  }
}
</script>

<style>

</style>
