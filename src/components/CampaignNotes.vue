<template>
<div>
  <div class="ui header">Notes</div>
  <div class="ui form">
      <div class="ui field">
        <input type="text" v-model="noteTitle">
      </div>
      <div class="ui field">
        <textarea rows="3" v-model="note"></textarea>
      </div>
      <div class="ui field button" @click="submitNote">Submit</div>
    </div>

      <campaign-note v-for="( note, id ) in campaignNotes" v-bind:key="id">
        //@TODO MAKE THESE HEADER/SUBHEADER
        <h3 slot="title">{{ note.noteTitle }}</h3>
        <h5 slot="date">{{ note.noteCreateDate }}</h5>
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
      note: '',
      noteTitle: ''
    }
  },
  props: ['campaignId'],
  components: {
    'campaign-note': CampaignNote
  },
  mounted () {
    this.getNotes(this.campaignId)
  },
  methods: {
    getNotes (campaignId) {
      let campaignNotesRef = firebase.database().ref('campaigns/' + this.campaignId + '/notes')
      campaignNotesRef.orderByChild('noteCreateDate').on('child_added', (snapshot) => {
        this.campaignNotes.unshift(snapshot.val())
      })
    },
    submitNote () {
      if (this.note.trim()) {
        let now = moment().format()
        let newNote = {
          noteTitle: this.noteTitle,
          noteCreateDate: now,
          note: this.note
        }
        firebase.database().ref('campaigns/' + this.campaignId + '/notes').push(newNote, (err) => {
          if (err) {
            throw err
          }
          this.note = ''
        })
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
