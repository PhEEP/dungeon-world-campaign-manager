<template>
<v-layout row>
  <v-flex md3 v-for="(look, index) in this.classLook" v-bind:key="index">
    <p class="body-2">{{ startCase(index) }}</p>
    <v-checkbox
      v-for="(detail, index) in look.split(',')"
      :key="look + index"
      v-model="looks"
      :value="detail"
      :label="detail"
    ></v-checkbox>
  </v-flex>
</v-layout>
</template>

<script>
  export default {
    name: 'CharacterLooks',
    props: ['classLook'],
    data () {
      return {
        looks: []
      }
    },
    methods: {
      startCase (str) {
        return this.$_.startCase(str)
      }
    },
    components: {
    },
    updated () {
      this.$emit('updateLook', this.looks)
    }
  }

</script>

<style>
#looks-editor {
  height: 200px;
}
</style>
