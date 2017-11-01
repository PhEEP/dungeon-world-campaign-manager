import * as firebase from 'firebase'

const characterAdmin = {
  namespaced: true,
  state: {
    className: '',
    exampleNames: '',
    flavorText: '',
    backgrounds: {},
    drives: {},
    looks: {},
    bonds: [],
    startingBonds: 0
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
    }
  },
  actions: {
    loadClassData ({commit}, payload) {
      let charRef = firebase.firestore().doc('characters/' + payload)
      charRef.get()
        .then(
          (doc) => {
            if (doc.exists) {
              let charData = doc.data()
              commit('setClassName', charData.name)
              commit('setExampleNames', charData.exampleNames)
              commit('setFlavorText', charData.flavorText)
              commit('setLooks', charData.look)
              commit('setBonds', charData.sampleBonds)
            }
          }
        )
    }
  },
  getters: {
    name (state) {
      return state.className
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
    }
  }
}

export default characterAdmin
