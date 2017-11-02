import * as firebase from 'firebase'
import _ from 'lodash'

const characterAdmin = {
  namespaced: true,
  state: {
    className: '',
    classId: '',
    exampleNames: '',
    flavorText: '',
    backgrounds: {},
    drives: {},
    looks: {},
    bonds: [],
    startingBonds: 0,
    deleting: false,
    deleteTarget: {}
  },
  mutations: {
    setClassName (state, payload) {
      state.className = payload
    },
    setExampleNames (state, payload) {
      state.exampleNames = payload
    },
    setFlavorText (state, payload) {
      state.flavorText = payload
    },
    setBackgrounds (state, payload) {
      state.backgrounds = payload
    },
    setDrives (state, payload) {
      state.drives = payload
    },
    setLooks (state, payload) {
      state.looks = payload
    },
    setBonds (state, payload) {
      state.bonds = payload
    },
    setStartingBonds (state, payload) {
      state.startingBonds = payload
    },
    setClassId (state, payload) {
      state.classId = payload
    },
    promptDelete (state, payload) {
      state.deleting = payload
    },
    setDeleteTarget (state, payload) {
      state.deleteTarget = payload
    }
  },
  actions: {
    updateBaseInfo ({commit, dispatch, state}, payload) {
      let baseInfo = {
        exampleNames: state.exampleNames,
        name: state.className,
        flavorText: state.flavorText,
        sampleBonds: state.bonds
      }
      let charRef = firebase.firestore().doc('characters/' + state.classId)
      charRef.update(baseInfo)
        .then(
          () => {
            commit('setSnackbar', { show: true, color: 'success', timeout: 4000, text: 'Updates made' }, { root: true })
          }
        )
        .catch(
          (error) => {
            commit('setError', error)
          }
        )
    },
    loadClassData ({commit, dispatch}, payload) {
      let charRef = firebase.firestore().doc('characters/' + payload)
      charRef.get()
        .then(
          (doc) => {
            if (doc.exists) {
              let charData = doc.data()
              commit('setClassName', charData.name)
              commit('setClassId', doc.id)
              commit('setExampleNames', charData.exampleNames)
              commit('setFlavorText', charData.flavorText)
              commit('setLooks', charData.look)
              commit('setBonds', charData.sampleBonds)
            }
          }
        )
      dispatch('loadBackgrounds', payload)
      dispatch('loadDrives', payload)
    },
    loadBackgrounds ({commit}, payload) {
      let bgRef = firebase.firestore().collection('characters/' + payload + '/backgrounds')
      bgRef.get()
        .then(
          (querySnapshot) => {
            let tempBGs = {}
            querySnapshot.forEach((doc) => {
              tempBGs[doc.id] = {...doc.data(), id: doc.id}
            })
            commit('setBackgrounds', tempBGs)
          }
        )
    },
    loadDrives ({commit}, payload) {
      let drivesRef = firebase.firestore().collection('characters/' + payload + '/drives')
      drivesRef.get()
        .then(
          (querySnapshot) => {
            let tempDrives = {}
            querySnapshot.forEach((doc) => {
              tempDrives[doc.id] = { ...doc.data(), id: doc.id }
            })
            commit('setDrives', tempDrives)
          }
        )
    },
    setName ({commit}, payload) {
      commit('setClassName', payload)
    },
    setExampleNames ({commit}, payload) {
      commit('setExampleNames', payload)
    },
    setFlavorText ({commit}, payload) {
      commit('setFlavorText', payload)
    },
    promptDelete ({commit}, payload) {
      commit('promptDelete', payload)
    },
    setDeleteTarget ({commit}, payload) {
      commit('setDeleteTarget', payload)
    },
    add ({commit, dispatch, state}, payload) {
      commit('clearError', null, { root: true })
      firebase.firestore().collection('characters/' + state.classId + '/' + payload.collection).doc(_.camelCase(payload.title)).set(payload)
        .then(
          (docRef) => {
            dispatch('load' + _.startCase(payload.collection), state.classId)
            commit('setSnackbar', { show: true, color: 'success', text: 'Addition successful', timeout: 4000 }, { root: true })
          }
        )
        .catch(
          (error) => {
            commit('setError', error, { root: true })
          }
        )
    },
    save ({commit, state, dispatch}, payload) {
      commit('clearError', null, { root: true })
      firebase.firestore().collection('characters/' + state.classId + '/' + payload.collection).doc(payload.id).set(payload)
      .then(
        (docRef) => {
          dispatch('load' + _.startCase(payload.collection), state.classId)
          commit('setSnackbar', { show: true, color: 'success', text: 'Save successful', timeout: 4000 }, { root: true })
        }
      )
      .catch(
        (error) => {
          commit('setError', error, { root: true })
        }
      )
    },
    delete ({commit, state, dispatch}, payload) {
      commit('clearError', null, { root: true })
      console.log('characters/' + state.classId + '/' + state.deleteTarget.collection + '/' + state.deleteTarget.id)
      firebase.firestore().doc('characters/' + state.classId + '/' + state.deleteTarget.collection + '/' + state.deleteTarget.id).delete()
        .then(
          () => {
            commit('setSnackbar', { show: true, color: 'success', text: 'Removal successful', timeout: 4000 }, { root: true })
            dispatch('load' + _.startCase(state.deleteTarget.collection), state.classId)
            commit('promptDelete', false)
          }
        )
        .catch(
          (error) => {
            commit('setError', error, { root: true })
          }
        )
    }
  },
  getters: {
    name (state) {
      return state.className
    },
    classId (state) {
      return state.classId
    },
    exampleNames (state) {
      return state.exampleNames
    },
    flavorText (state) {
      return state.flavorText
    },
    backgrounds (state) {
      return state.backgrounds
    },
    drives (state) {
      return state.drives
    },
    looks (state) {
      return state.looks
    },
    bonds (state) {
      return state.bonds
    },
    startingBonds (state) {
      return state.startingBonds
    },
    deleting (state) {
      return state.deleting
    },
    deleteTarget (state) {
      return state.deleteTarget
    }
  }
}

export default characterAdmin
