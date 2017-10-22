<template>
  <v-card>
    <v-card-media :src="this.avatarUrl" height="200px" contain></v-card-media>
    <v-card-title primary-title>
      <div>
        <h1 class="display-1">{{ this.name }}
          <h1 class="subheading">{{ this.className }}</h1>
        </h1>
      </div>
    </v-card-title>
    <v-card-text>
      <div>
        <h3 class="title" mb-0>{{ this.drive.title }}</h3>
        <p class="body-1">{{ this.drive.description }}</p>
      </div>
      <div>
        <h3 class="title">{{ this.background.title }}</h3>
        <p class="body-1" v-html="this.background.text"></p>
      </div>
      <div>
        <h3 class="title">Look</h3>
        <p class="body-1" v-html="this.look"></p>
      </div>
      <div>
        <h3 class="title">Bonds
          <v-btn flat icon color="primary" dark @click.native="dialog = true" class="text-xs-right">
            <v-icon>add</v-icon>
          </v-btn>
        </h3>
        <p class="body-1" v-html="this.bonds"></p>
      </div>
        <v-dialog fullscreen transition="dialog-bottom-transition" :overlay="false" v-model="dialog">
          <v-card>
            <v-toolbar color="accent">
              <v-btn icon @click.native="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Choose 4 to start</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <vue-editor v-model="bonds" :editorToolbar="customToolbar" id="bondsEditor"></vue-editor>
              <div v-for="(bond, index) in this.sampleBonds" :key="index"><v-btn icon flat color="primary" @click="bonds += bond"><v-icon>add</v-icon> </v-btn>{{ bond }}</div>
            </v-card-text>
          </v-card>
        </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import $ from 'jquery'

export default {
  name: 'CharacterDetails',
  props: ['drive', 'background', 'avatarUrl', 'look', 'sampleBonds', 'name', 'className'],
  components: {
    VueEditor
  },
  data () {
    return {
      bonds: '',
      customToolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'bullet'}]
      ],
      dialog: false
    }
  },
  methods: {
    openModal () {
      $('.ui.modal').modal('show')
    },
    closeModal () {
      $('.ui.modal').modal('hide')
    }
  }
}
</script>

<style>

</style>
