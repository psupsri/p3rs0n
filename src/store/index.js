import Vue from 'vue'
import Vuex from 'vuex'

import People from './people'
import User from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    People,
    User
  }
})
