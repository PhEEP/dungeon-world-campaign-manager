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
      <h3 class="ui header"></h3>
      <div v-html="this.look" ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterBackstory',
  props: ['drive', 'background', 'avatarUrl', 'look']
}
</script>

<style>

</style>
