import * as firebase from 'firebase'
import _ from 'lodash'
const equipmentDB = firebase.firestore().collection('equipment')

const equipmentAdmin = {
  namespaced: true,
  state: {
    equipment: null,
    deleting: false,
    deleteTarget: {}
  },
  mutations: {
    promptDelete (state, payload) {
      state.deleting = payload
    },
    setDeleteTarget (state, payload) {
      state.deleteTarget = payload
    },
    setEquipment (state, payload) {
      state.equipment = payload
    }
  },
  actions: {
    loadEquipment ({commit, dispatch}) {
      equipmentDB.get()
        .then(
          (querySnapshot) => {
            let tempEquipment = []
            querySnapshot.forEach(
              (doc) => {
                tempEquipment[doc.id] = {...doc.data(), id: doc.id}
              }
            )
            commit('setEquipment', tempEquipment)
            commit('clearError', null, { root: true })
          }
        )
        .catch(
          (error) => {
            commit('setError', error, { root: true })
          }
        )
    },
    add ({commit, dispatch, state}, payload) {
      commit('clearError', null, { root: true })
      equipmentDB.doc(_.camelCase(payload.title)).set(payload)
        .then(
          (docRef) => {
            dispatch('loadEquipment')
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
      equipmentDB.doc(payload.id).set(payload)
      .then(
        (docRef) => {
          dispatch('loadEquipment')
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
      equipmentDB.doc(state.deleteTarget.id).delete()
        .then(
          () => {
            commit('setSnackbar', { show: true, color: 'success', text: 'Removal successful', timeout: 4000 }, { root: true })
            dispatch('loadEquipment')
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
    equipment (state) {
      return state.equipment
    },
    deleting (state) {
      return state.deleting
    },
    deleteTarget (state) {
      return state.deleteTarget
    }
  }
}

export default equipmentAdmin
