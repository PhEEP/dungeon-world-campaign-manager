<template>
  <div>
    <dwcm-nav></dwcm-nav>
    <div class="ui main container">
      <section class="ui section">
          <p>Welcome to the Dungeon World Campaign Manager (DWCM)!</p>
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
      msg: 'Welcome to Your Vue.js App',
      noCampaigns: true,
      campaignName: ''
    }
  },
  methods: {
    createNewCampaign () {
      alert(this.campaignName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  margin-top: 7rem;
}
</style>
