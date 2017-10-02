<template>
<div>
  <dwcm-nav></dwcm-nav>
    <div class="ui main container">
      <div class="ui vertical segment">
        <h1 class="header">Campaigns</h1>
      </div>
      <transition name="fade">
        <section v-if="noCampaigns" class="ui section">
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
      </transition>
      <transition name="fade">
        <div class="ui vertical segment" v-if="!noCampaigns">
          <h2 v-text="campaignName"></h2>
          <campaign-notes v-bind:campaignId="campaignId"></campaign-notes>
        </div>
      </transition>
    </div>
  </div>
</div>
</template>
// @TODO figure out how to add campaigns and get them back from the DB
<script>
import DWCMNav from '@/components/DWCMNav'
import { handleCampaignCreate } from '@/helpers/handleCampaignCreate'
import CampaignNotes from '@/components/CampaignNotes'
import firebase from 'firebase'
export default {
  name: 'campaigns',
  data () {
    return {
      noCampaigns: true,
      campaignName: '',
      userId: '',
      campaigns: '',
      campaignId: ''
    }
  },
  components: {
    'dwcm-nav': DWCMNav,
    'campaign-notes': CampaignNotes
  },
  created () {
    let user = firebase.auth().currentUser
    if (user) {
      this.userId = user.uid
      this.getUserCampaigns(this.userId)
    }
  },
  mounted () {

  },
  updated () {

  },
  computed: {
    descendingCampaignNotes () {
      return this.campaignNotes.reverse()
    }
  },
  methods: {
    createNewCampaign () {
      handleCampaignCreate(this.userId, this.campaignName)
      this.getUserCampaigns(this.userId)
    },
    getUserCampaigns (userId) {
      firebase.database().ref('users/' + userId + '/campaigns').once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let thisCampaign = childSnapshot.val()
          console.log(thisCampaign, 'this campaign')
          this.campaignId = thisCampaign.campaignId
          this.campaigns = thisCampaign
          this.campaignName = thisCampaign.name
          this.noCampaigns = false
          return true
        })
      })
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
