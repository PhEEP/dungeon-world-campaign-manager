// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { config } from './helpers/firebaseConfig'
import '../node_modules/semantic-ui-css/semantic.min.css'

Vue.config.productionTip = false

let app

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }
})
