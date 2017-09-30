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
        <div class="ui form">
          <div class="ui field">
            <label for="">Notes</label>
            <textarea rows="3" v-model="note"></textarea>
          </div>
          <div class="ui field button" @click="submitNote">Submit</div>
        </div>
        <ul>
          <li v-for="note in campaignNotes" v-bind:key="note.key">{{ note }}</li>
        </ul>
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
      campaigns: '',
      campaignId: '',
      note: '',
      campaignNotes: []
    }
  },
  components: {
    'dwcm-nav': DWCMNav
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
  methods: {
    createNewCampaign () {
      handleCampaignCreate(this.userId, this.campaignName)
      this.getUserCampaigns(this.userId)
    },
    getUserCampaigns (userId) {
      firebase.database().ref('users/' + userId + '/campaigns').once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          for (var thecampaign in snapshot.val()) {
            this.campaignId = thecampaign
            this.getNotes(thecampaign)
          }
          this.campaigns = snapshot.val()
          this.campaignName = snapshot.val().name
          this.noCampaigns = false
        }
      })
    },
    getNotes (campaignId) {
      let campaignNotesRef = firebase.database().ref('campaigns/' + this.campaignId + '/notes')
      campaignNotesRef.on('child_added', (snapshot) => {
        console.log(snapshot.val())
        let note = snapshot.val()
        this.notes.unshift(note)
      })
      campaignNotesRef.on('value', (snapshot) => {
        console.log('value from campaign notes ref value')
        let campaignNotes = snapshot.val()
        console.log(campaignNotes)
        this.campaignNotes = campaignNotes
      })
    },
    submitNote () {
      if (this.note.trim()) {
        firebase.database().ref('campaigns/' + this.campaignId + '/notes').push(this.note, (err) => {
          if (err) {
            throw err
          }
          this.note = ''
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
