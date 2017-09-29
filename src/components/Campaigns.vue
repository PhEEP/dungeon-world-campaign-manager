<template>
<div>
  <dwcm-nav></dwcm-nav>
    <div class="ui main container">
      <section class="ui section">
        <h1 class="title">Campaigns</h1>
          <p v-if="noCampaigns">Looks like you don't have any campaigns, fill out the form below to create one!</p>
          <form action="#" class="ui large form" @submit.prevent="submitForm">
            <div class="ui stacked segment">
            <h2 v-if="campaignName">BEHOLD! {{campaignName}}</h2>
              <div class="field">
                <div class="ui input">
                  <input type="text" placeholder="Your engaging campaign name!" v-model="campaignName">
                </div>
              </div>
              <button class="ui button" @click="createNewCampaign">Create Campaign</button>
            </div>
          </form>
      </section>
    </div>
  </div>
</div>
</template>

<script>
import DWCMNav from '@/components/DWCMNav'
export default {
  name: 'campaigns',
  data () {
    return {
      noCampaigns: true,
      campaignName: ''
    }
  },
  components: {
    'dwcm-nav': DWCMNav
  }
}
</script>

<style>
</style>
