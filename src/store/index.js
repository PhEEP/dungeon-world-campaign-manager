import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import characterAdmin from '@/store/characterAdmin'
import playerCharacter from '@/store/playerCharacter'
import equipmentAdmin from '@/store/equipmentAdmin'
require('firebase/firestore')
import _ from 'lodash'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    characterAdmin,
    playerCharacter,
    equipmentAdmin
  },
  state: {
    authError: null,
    authProviders: {
      'google': new firebase.auth.GoogleAuthProvider()
    },
    loading: false,
    error: null,
    user: null,
    userIsAdmin: false,
    createdCharacters: [],
    characterClasses: [],
    snackbar: {
      show: false,
      timeout: 4000,
      color: 'primary',
      text: 'Some Message'
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setCreatedCharacters (state, payload) {
      state.createdCharacters = payload
    },
    setCharacterClasses (state, payload) {
      state.characterClasses = payload
    },
    setUserIsAdmin (state, payload) {
      state.userIsAdmin = payload
    },
    setSnackbar (state, payload) {
      state.snackbar = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            store.dispatch('setUserRole', user.uid)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signUserInWithProvider ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(this.state.authProviders[payload.provider])
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            store.dispatch('setUserRole', user.uid)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            store.dispatch('setUserRole', user.uid)
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid})
      store.dispatch('setUserRole', payload.uid)
    },
    setSnackbar ({commit}, payload) {
      commit('setSnackbar', payload)
    },
    setUserRole ({commit}, payload) {
      firebase.firestore().doc('users/' + payload).get()
        .then(
          (doc) => {
            if (doc.exists) {
              commit('setUserIsAdmin', _.get(doc.data(), 'role', 'user') === 'admin')
            }
          })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      commit('setUserIsAdmin', false)
    },
    clearError ({commit}) {
      commit('clearError')
    },
    getCreatedCharacters ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.firestore().collection('users/' + this.state.user.id + '/characters').get()
        .then(
          (querySnapshot) => {
            let tempArr = []
            querySnapshot.forEach(
              (doc) => {
                tempArr.push({
                  id: doc.id,
                  name: doc.data().name,
                  avatar: doc.data().avatarUrl,
                  className: doc.data().className,
                  classId: doc.data().classId
                })
              })
            commit('setCreatedCharacters', tempArr)
            commit('setLoading', false)
          }
        )
        .catch(
          (err) => {
            commit('setLoading', false)
            commit('setError', err)
          }
        )
    },
    getCharacterClasses ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.firestore().collection('characters').where('name', '>', '').get()
        .then(
          (querySnapshot) => {
            let tempArr = []
            querySnapshot.forEach(
              (doc) => {
                tempArr.push({
                  id: doc.id,
                  name: doc.data().name,
                  flavorText: doc.data().flavorText,
                  classIcon: doc.data().classIcon.iconUrl,
                  classIconAttribution: doc.data().classIcon.attribution
                })
              })
            commit('setCharacterClasses', tempArr)
            commit('setLoading', false)
          })
        .catch(
          (err) => {
            commit('setLoading', false)
            commit('setError', err)
          }
        )
    },
    deleteCharacter ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.firestore().doc('users/' + this.state.user.id + '/characters/' + payload).delete()
        .then(
          () => {
            const filteredCharacters = _.filter(this.state.createdCharacters, (o) => {
              return o.id !== payload
            })
            commit('setCreatedCharacters', filteredCharacters)
            commit('setLoading', false)
          })
        .catch(
          (error) => {
            commit('setLoading', false)
            commit('setError', error)
          })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    getCreatedCharacters (state) {
      return state.createdCharacters
    },
    getCharacterClasses (state) {
      return state.characterClasses
    },
    getUserRole (state) {
      return state.userIsAdmin
    },
    snackbar (state) {
      return state.snackbar
    }
  }
})
