<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h4 >Backgrounds
        <v-btn
          fab
          outline
          flat
          small
          icon
          @click="editingBackground = !editingBackground">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          fab
          outline
          flat
          small
          icon
          @click="addingBackground = !addingBackground">
          <v-icon>add</v-icon>
        </v-btn>
      </h4>
    </v-flex>
    <v-flex md4 v-for="(background, index) in backgrounds" :key="index">
      <div v-if="!editingBackground">
        <h5>{{ background.title }}</h5>
        <div v-html="background.text"></div>
      </div>
      <v-card v-if="editingBackground">
        <v-card-text>
          <v-text-field
            v-model="background.title"
            label="Background Title"
          >
          </v-text-field>
          <vue-editor
            :id="'adminBackground' + index"
            v-model="background.text"
            :editorToolbar="customToolbar"
            placeholder="Background text"
          >
          </vue-editor>
          <v-layout>
            <v-btn
              color="primary"
              @click="saveBackground(background)"
            >
            <v-icon>save</v-icon>
              Save
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              fab
              outline
              small
              icon
              color="warning"
              @click="bgToDelete = background.id, promptDelete()"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md4 card v-if="addingBackground">
      <v-text-field v-model="tempBackground.title" label="Background Title"></v-text-field>
      <vue-editor id="tempBackground" v-model="tempBackground.text" :editorToolbar="customToolbar" placeholder="Background text"></vue-editor>
      <v-btn color="secondary" dark @click="addBackground">Add background</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import _ from 'lodash'

export default {
  data () {
    return {
      tempBackground: {
        title: '',
        text: ''
      },
      editingBackground: false,
      addingBackground: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{'list': 'bullet'}]
      ],
      bgToDelete: ''
    }
  },
  components: {
    VueEditor
  },
  computed: {
    backgrounds () {
      return this.$store.getters['characterAdmin/backgrounds']
    },
    deleting () {
      return this.$store.getters['characterAdmin/deleting']
    }
  },
  methods: {
    addBackground () {
      this.$store.dispatch('characterAdmin/add', {...this.tempBackground, collection: 'backgrounds'})
      this.tempBackground = _.mapValues(this.tempBackground, (o) => { return '' })
    },
    saveBackground (bg) {
      this.$store.dispatch('characterAdmin/save', {...bg, collection: 'backgrounds'})
    },
    promptDelete () {
      this.$store.dispatch('characterAdmin/setDeleteTarget', { id: this.bgToDelete, collection: 'backgrounds' })
      this.$store.dispatch('characterAdmin/promptDelete', true)
    },
    cancelDelete () {
      this.$store.commit('characterAdmin/promptDelete', false)
    }
  }
}
</script>

<style>

</style>
