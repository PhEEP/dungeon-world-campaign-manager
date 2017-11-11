<template>
    <v-layout column wrap>
      <v-flex xs12>
        <h4>Details</h4>
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="name"
          label="Class Name"
        ></v-text-field>
        <h5>Example Names
          <v-btn
            icon
            @click="editingExampleNames = !editingExampleNames"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </h5>
        <div
          class="body-1"
          v-html="exampleNames"
          v-if="!editingExampleNames"
        ></div>
        <v-text-field
          textarea
          label="Example Names"
          v-model="exampleNames"
          v-if="editingExampleNames"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <h5>Flavor Text <v-btn icon @click="editingFlavorText = !editingFlavorText"><v-icon>edit</v-icon></v-btn></h5>
        <div class="body-1" v-html="flavorText" v-if="!editingFlavorText" ></div>
        <vue-editor id="caFlavorText" v-model="flavorText" :editorToolbar="customToolbar" v-if="editingFlavorText"></vue-editor>
      </v-flex>
    </v-layout>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'CADetails',
  components: {
    VueEditor
  },
  data () {
    return {
      editingFlavorText: false,
      editingExampleNames: false,
      customToolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'bullet' }]
      ]
    }
  },
  computed: {
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
    }
  }
}
</script>

<style>

</style>
