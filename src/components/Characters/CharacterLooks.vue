<template>
<div class="row">
  <div class="ui stackable grid segment">
      <div class="sixteen wide column">
        <h3 class="ui header">Look
          <div class="sub header"> Pick as many that apply</div>
        </h3>
      </div>
      <div class="eight wide column">
        <h4 class="ui header">
          Some examples
        </h4>
        <ul>
          <li v-for="(look, index) in this.classLook" v-bind:key="index">
            {{ look }}
          </li>
        </ul>
      </div>
      <div class="eight wide column">
        <vue-editor :editorToolbar="customToolbar" placeholder="What do you look like?" id="looks-editor" @input="updateLook" v-model="looks"></vue-editor>
      </div>
  </div>
</div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    name: 'CharacterLooks',
    props: ['classLook'],
    data () {
      return {
        looks: '',
        error: '',
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'bullet' }]
        ]
      }
    },
    components: {
      VueEditor
    },
    methods: {
      updateLook () {
        this.$emit('updateLook', this.looks)
      }
    }
  }

</script>

<style>
#looks-editor {
  height: 200px;
}
</style>
