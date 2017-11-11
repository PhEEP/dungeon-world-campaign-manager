import * as firebase from 'firebase'
import _ from 'lodash'

const playerCharacter = {
  namespaced: true,
  state: {
    name: null,
    className: null,
    classId: null,
    flavorText: null,
    background: null,
    drive: null,
    looks: null,
    bonds: [],
    startingBonds: 0,
    sampleBonds: [],
    maximumHP: 0,
    maximumLoad: 0,
    damageMod: 0,
    deleting: false
  },
  mutations: {
    setClassName (state, payload) {
      state.className = payload
    },
    setName (state, payload) {
      state.name = payload
    },
    setFlavorText (state, payload) {
      state.flavorText = payload
    },
    setBackground (state, payload) {
      state.background = payload
    },
    setDrive (state, payload) {
      state.drive = payload
    },
    setLooks (state, payload) {
      if (typeof payload !== 'undefined') {
        state.looks = payload
      } else {
        state.looks = {
          body: '',
          decoration: '',
          eyes: '',
          garb: '',
          gender: '',
          race: ''
        }
      }
    },
    setBonds (state, payload) {
      state.bonds = payload
    },
    setSampleBonds (state, payload) {
      state.sampleBonds = payload
    },
    // if payload can be interpreted as Integer, use it
    // otherwise default to `0`
    setStartingBonds (state, payload) {
      state.startingBonds = _.defaultTo(_.toInteger(payload), 0)
    },
    setMaximumHP (state, payload) {
      state.maximumHP = _.defaultTo(_.toInteger(payload), 0)
    },
    setMaximumLoad (state, payload) {
      state.maximumLoad = _.defaultTo(_.toInteger(payload), 0)
    },
    setDamageMod (state, payload) {
      state.damageMod = _.defaultTo(_.toInteger(payload), 0)
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
        startingBonds: state.startingBonds,
        look: state.looks,
        maximumLoad: state.maximumLoad,
        maximumHP: state.maximumHP,
        damageMod: state.damageMod
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
    loadPC ({commit, dispatch}, payload) {
      console.log('users/' + payload.userID + '/characters/' + payload.charID)
      let charRef = firebase.firestore().doc('users/' + payload.userID + '/characters/' + payload.charID)
      charRef.get()
        .then(
          (doc) => {
            if (doc.exists) {
              let charData = doc.data()
              console.log(charData)
              commit('setClassName', charData.className)
              commit('setName', charData.name)
              commit('setClassId', doc.id)
              commit('setFlavorText', charData.flavorText)
              commit('setLooks', charData.look)
              commit('setBonds', charData.bonds || [])
              commit('setSampleBonds', charData.sampleBonds)
              commit('setStartingBonds', charData.startingBonds)
              commit('setMaximumHP', charData.maximumHP)
              commit('setMaximumLoad', charData.maximumLoad)
              commit('setDamageMod', charData.damageMod)
              commit('setBackground', charData.background)
              commit('setDrive', charData.drive)
            } else {
              console.log('no doc exists')
            }
          }
        )
      .catch(
        (error) => {
          commit('setError', error, { root: true })
        }
      )
    },
    setName ({commit}, payload) {
      commit('setName', payload)
    },
    setClassName ({commit}, payload) {
      commit('setClassName', payload)
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
    },
    addBond ({commit, state}, payload) {
      let tempBonds = state.bonds
      tempBonds.push(payload)
      commit('setBonds', _.uniq(tempBonds))
    },
    removeBond ({commit, state}, payload) {
      commit('setBonds', _.without(state.bonds, payload))
    },
    setStartingBonds ({commit}, payload) {
      commit('setStartingBonds', payload)
    },
    setMaximumLoad ({commit}, payload) {
      commit('setMaximumLoad', payload)
    },
    setMaximumHP ({commit}, payload) {
      commit('setMaximumHP', payload)
    },
    setDamageMod ({commit}, payload) {
      commit('setDamageMod', payload)
    },
    setLook ({commit, state}, payload) {
      let tempLooks = state.looks
      commit('setLooks', _.set(tempLooks, _.keys(payload)[0], _.values(payload)[0]))
    }
  },
  getters: {
    name (state) {
      return state.name
    },
    className (state) {
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
    background (state) {
      return state.background
    },
    drive (state) {
      return state.drive
    },
    looks (state) {
      return state.looks
    },
    bonds (state) {
      return state.bonds
    },
    sampleBonds (state) {
      return state.sampleBonds
    },
    startingBonds (state) {
      return state.startingBonds
    },
    maximumHP (state) {
      return state.maximumHP
    },
    maximumLoad (state) {
      return state.maximumLoad
    },
    damageMod (state) {
      return state.damageMod
    },
    deleting (state) {
      return state.deleting
    },
    deleteTarget (state) {
      return state.deleteTarget
    }
  }
}

export default playerCharacter
