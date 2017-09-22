<template>
  <div id="app">
    <dwcmnav></dwcmnav>
    <router-view></router-view>
  </div>
</template>

<script>
import dwcmnav from '@/components/DWCMNav'
export default {
  name: 'app',
  components: {
    dwcmnav
  }
}
</script>

<style>

</style>
