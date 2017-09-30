<template>
  <div>
    <dwcm-nav></dwcm-nav>
    <div class="ui main container">
      <div class="ui vertical masthead center aligned segment">
        <div class="ui text container">
          <h1 class="ui header">
            Dungeon World Campaign Manager
            <div class="sub header">Keep everything in order</div>
          </h1>
          <div class="ui huge primary button">
            Allons-y
          </div>
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui vertical">
          <h2 class="ui header">Campaigns</h2>
          <p>Keep your notes in order, your players informed, and your creations at your fingertips</p>
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui vertical">
          <h2 class="ui header">Characters</h2>
          <p>Manage your character sheets, keep track of the small stuff, have fun!</p>
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui vertical">
          <h2 class="ui header">Compendium</h2>
          <p>Browse the accumulated knowledge of the ages, create new NPCs, find treasure</p>
        </div>
      </div>
      <section>
      </section>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import DWCMNav from '@/components/DWCMNav'
export default {
  name: 'hello',
  components: {
    'dwcm-nav': DWCMNav
  },
  data () {
    return {
      userName: ''
    }
  },
  mounted () {
    let user = firebase.auth().currentUser
    if (user) this.userName = user.displayName
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
