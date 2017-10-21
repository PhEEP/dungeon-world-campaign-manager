<template>
  <div class="ui card">
    <div class="ui medium image">
      <img :src="this.avatarUrl" alt="">
    </div>
    <div class="content">
      <h3 class="ui header">{{ this.drive.title }}</h3>
      <p>{{ this.drive.description }}</p>
      <h3 class="ui header">{{ this.background.title }}</h3>
      <div v-html="this.background.text"></div>
      <h3 class="ui header">Look</h3>
      <div v-html="this.look" ></div>
      <h3 class="ui header">Bonds</h3>
      <button @click="openModal" class="mini ui basic inverted secondary icon button"><i class="plus icon"></i></button>
      <div v-html="this.bonds" style="max-height: 200px; overflow-y:scroll;"></div>
      <div class="ui modal">
        <i class="close icon" @click="closeModal"></i>
        <div class="ui header">Bonds <div class="ui sub header">Choose 4 to start</div> </div>
        <div class="description">
          <vue-editor v-model="bonds" :editorToolbar="customToolbar" id="bondsEditor"></vue-editor>
          <div class="ui four column grid">
            <div v-for="(bond, index) in this.sampleBonds" :key="index" class="column"><button class="mini ui icon button" @click="bonds += bond"><i class="plus icon"></i> </button>{{ bond }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import $ from 'jquery'

export default {
  name: 'CharacterDetails',
  props: ['drive', 'background', 'avatarUrl', 'look', 'sampleBonds'],
  components: {
    VueEditor
  },
  data () {
    return {
      bonds: '',
      customToolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'bullet'}]
      ]
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
