<template>
<div >
        <h5 class="title">Look
          <div class="subheading"> Pick as many that apply</div>
        </h5>
        <vue-editor :editorToolbar="customToolbar" placeholder="What do you look like?" id="looks-editor" @input="updateLook" v-model="looks"></vue-editor>
        <h4 class="caption">
          Some examples
        </h4>
        <ul>
          <li v-for="(look, index) in this.classLook" v-bind:key="index">
            {{ look }}
          </li>
        </ul>
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
