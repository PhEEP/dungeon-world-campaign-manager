// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import router from './router'
import firebase from 'firebase'
import { config } from './helpers/firebaseConfig'
import { store } from './store'
import './stylus/main.styl'
import AlertCmp from './components/Shared/Alert.vue'
import App from './App'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.component('app-alert', AlertCmp)

firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$router.replace('/hello')
      }
    })
  },
  template: '<App/>',
  components: { App }
})
