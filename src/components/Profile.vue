<template>
  <div>
    <div class="ui main container">
      <h1>This is {{ userName }}'s profile </h1>
    </div>
  </div>
</template>

<script>
import DWCMNav from '@/components/DWCMNav'
import firebase from 'firebase'
export default {
  name: 'Profile',
  data () {
    return {
      userName: ''
    }
  },
  components: {
    DWCMNav
  },
  mounted () {
    let user = firebase.auth().currentUser
    if (user) {
      this.userName = user.displayName
    }
  }
}
</script>

<style>
.main {
}
</style>
