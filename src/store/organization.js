// import _ from 'lodash'
import { Organization } from '@/services'

const state = {
  organization: []
}

const mutations = {
  SETORGS (state) {
    Organization.get((data) => {
      state.organization = data
    })
  }
}

const actions = {
  setorgs: ({ commit }) => commit('SETORGS')
}

const getters = {
  getOrgs: state => state.organization
  // getPeopleById: state => id => _.filter(state.organization, { '_id': id })
}

export default {
  state,
  getters,
  mutations,
  actions
}
