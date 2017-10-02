<template>
  <div>
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
          <div class="ui three column grid">
            <div class="column">
              <div class="ui fluid card link" @click="handleCampaignSectionClick('notes')">
                <div class="image">
                  <img src="https://placeimg.com/200/200/tech" alt="">
                </div>
                <div class="content">
                  <div class="header">Notes</div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="ui fluid card link" @click="handleCampaignSectionClick('characters')">
                <div class="image">
                  <img src="https://placeimg.com/200/200/people" alt="">
                </div>
                <div class="content">
                  <div class="header">Characters</div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="ui fluid card link" @click="handleCampaignSectionClick('compendium')">
                <div class="image">
                  <img src="https://placeimg.com/200/200/nature" alt="">
                </div>
                <div class="content">
                  <div class="header">Compendium</div>
                </div>
              </div>
            </div>

          </div>
          <hr>
          <transition name="fade">
            <campaign-notes v-bind:campaignId="campaignId" v-if="activeSection === 'notes'"></campaign-notes>
            <campaign-characters v-bind:campaignId="campaignId" v-if="activeSection === 'characters'"></campaign-characters>
            <campaign-compendium v-bind:campaignId="campaignId" v-if="activeSection === 'compendium'"></campaign-compendium>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</div>
</template>
<script>
import { handleCampaignCreate } from '@/helpers/handleCampaignCreate'
import CampaignNotes from '@/components/CampaignNotes'
import CampaignCharacters from '@/components/CampaignCharacters'
import CampaignCompendium from '@/components/CampaignCompendium'
import firebase from 'firebase'
export default {
  name: 'campaigns',
  data () {
    return {
      noCampaigns: true,
      campaignName: '',
      userId: '',
      campaigns: '',
      campaignId: '',
      activeSection: ''
    }
  },
  components: {
    'campaign-notes': CampaignNotes,
    'campaign-characters': CampaignCharacters,
    'campaign-compendium': CampaignCompendium
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
    },
    handleCampaignSectionClick (section) {
      this.activeSection = section
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
