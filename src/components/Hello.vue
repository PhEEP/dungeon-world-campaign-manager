<template>
  <div>
    <dwcm-nav></dwcm-nav>
    <div class="ui main container">
      <section class="ui section">
        <h1 class="title">Dungeon World Campaign Manager</h1>
      </section>
    </div>
  </div>
</template>

<script>
import DWCMNav from '@/components/DWCMNav'
export default {
  name: 'hello',
  components: {
    'dwcm-nav': DWCMNav
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    console.log('mounted hello')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  margin-top: 7rem;
}
</style>
