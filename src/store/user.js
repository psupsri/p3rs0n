// import _ from 'lodash'
import { User } from '@/services'

const state = {
  users: []
}

const mutations = {
  SETUSERS (state) {
    User.getAllUsers((data) => {
      state.users = data
    })
  }
}

const actions = {
  setusers: ({ commit }, sorting) => commit('SETUSERS')
}

const getters = {
  getUsers: state => state.users
}

export default {
  state,
  getters,
  mutations,
  actions
}
