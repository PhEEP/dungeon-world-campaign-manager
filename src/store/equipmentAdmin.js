import * as firebase from 'firebase'

const equipmentAdmin = {
  namespaced: true,
  state: {
    equipment: [],
    deleting: false,
    deleteTarget: {},
    baseItem: {
      name: 'null',
      weight: 0,
      price: 0,
      tags: ['none'],
      damage: 0,
      armor: 0,
      piercing: 0
    }
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
      firebase.firestore().collection('equipment').get()
        .then(
          (querySnapshot) => {
            let tempEquipment = []
            querySnapshot.forEach(
              (doc) => {
                tempEquipment.push({...doc.data(), id: doc.id, value: false, ...this.baseItem})
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
      firebase.firestore().collection('equipment').doc(payload.id).set(payload)
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
      firebase.firestore().collection('equipment').doc(payload.id).set(payload)
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
      firebase.firestore().collection('equipment').doc(state.deleteTarget.id).delete()
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
