<template>
  <div id="app" class="ui">
    <dwcm-nav></dwcm-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import DWCMNav from '@/components/DWCMNav'
export default {
  name: 'app',
  components: {
    'dwcm-nav': DWCMNav
  }
}
</script>

<style>

</style>
