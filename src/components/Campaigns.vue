<template>
<div>
  <dwcm-nav></dwcm-nav>
    <div class="ui main container">
      <div class="ui vertical segment">
        <h1 class="header">Campaigns</h1>
      </div>
      <section v-if="noCampaigns"class="ui section">
          <form action="#" class="ui large form" @submit.prevent="createNewCampaign">
            <p>Looks like you don't have any campaigns, fill out the form below to create one!</p>
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui input">
                  <input type="text" placeholder="Your engaging campaign name!" v-model="campaignName">
                </div>
              </div>
              <button class="ui button">Create Campaign</button>
            </div>
          </form>
      </section>
      <div class="ui vertical segment">
        <h2 v-for="campaign in campaigns" v-bind:key="campaign.key">
          {{ campaign.name }}
        </h2>
      </div>
    </div>
  </div>
</div>
</template>
// @TODO figure out how to add campaigns and get them back from the DB
<script>
import DWCMNav from '@/components/DWCMNav'
import { handleCampaignCreate } from '@/helpers/handleCampaignCreate'
import firebase from 'firebase'
export default {
  name: 'campaigns',
  data () {
    return {
      noCampaigns: true,
      campaignName: '',
      userId: '',
      campaigns: ''
    }
  },
  components: {
    'dwcm-nav': DWCMNav
  },
  mounted () {
    let user = firebase.auth().currentUser
    if (user) {
      this.userId = user.uid
      this.getUserCampaigns(this.userId)
    }
  },
  updated () {
  },
  methods: {
    createNewCampaign () {
      console.log('creating new campaign')
      handleCampaignCreate(this.userId, this.campaignName)
      this.getUserCampaigns(this.userId)
    },
    getUserCampaigns (userId) {
      console.log('getting campaigns')
      firebase.database().ref('users/' + userId + '/campaigns').once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          this.campaigns = snapshot.val()
          this.campaignName = snapshot.val().name
          this.noCampaigns = false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
