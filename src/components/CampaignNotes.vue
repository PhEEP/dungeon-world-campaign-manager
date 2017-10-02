<template>
<div>
  <div class="ui form">
      <div class="ui field">
        <label for="">Notes</label>
        <textarea rows="3" v-model="note"></textarea>
      </div>
      <div class="ui field button" @click="submitNote">Submit</div>
    </div>
  <campaign-note v-for="( note, id ) in reversedCampaignNotes" v-bind:key="id">
    <h5 slot="header">{{ note.noteCreateDate }}</h5>
    {{id}}
    <p slot="body">{{ note.note }}</p>
  </campaign-note>
</div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import CampaignNote from '@/components/CampaignNote'
export default {
  name: 'CampaignNotes',
  data () {
    return {
      campaignNotes: [],
      note: ''
    }
  },
  props: ['campaignId'],
  components: {
    'campaign-note': CampaignNote
  },
  created () {
    this.getNotes(this.campaignId)
  },
  methods: {
    getNotes (campaignId) {
      let campaignNotesRef = firebase.database().ref('campaigns/' + this.campaignId + '/notes')
      campaignNotesRef.once('value', (snapshot) => {
        snapshot.forEach((data) => {
          this.campaignNotes.push(data)
        })
      })
    },
    submitNote () {
      if (this.note.trim()) {
        let now = moment().format()
        let newNote = {
          noteCreateDate: now,
          note: this.note
        }
        firebase.database().ref('campaigns/' + this.campaignId + '/notes').push(newNote, (err) => {
          if (err) {
            throw err
          }
          this.note = ''
        })
        this.campaignNotes.push(newNote)
      }
    }
  },
  computed: {
    reversedCampaignNotes () {
      return this.campaignNotes.reverse()
    }
  }
}
</script>

<style>

</style>
