import _ from 'lodash'
import { People } from '@/services'

const state = {
  people: []
}

const mutations = {
  SETPEOPLE (state, sorting) {
    People.get(sorting, (data) => {
      state.people = data
    })
  }
}

const actions = {
  setpeople: ({ commit }, sorting) => commit('SETPEOPLE', sorting)
}

const getters = {
  getPeople: state => state.people,
  getPeopleById: state => id => _.filter(state.people, { '_id': id }),
  getPeopleOrgSimilar (state) {
    return (id) => {
      let i = _.filter(state.people, {'_id': id})
      let p = state.people.filter((s) => {
        return s.occupation[0].organization === i[0].occupation[0].organization && s._id !== i[0]._id && i[0].occupation[0].organization !== ''
      })
      return p
    }
  },
  getPeopleSchoolSimilar (state) {
    return (id) => {
      let i = _.filter(state.people, {'_id': id})
      let p = state.people.filter((s) => {
        return s.education[0].school === i[0].education[0].school && s._id !== i[0]._id && i[0].education[0].school !== ''
      })
      return p
    }
  },
  getPeopleByOrg (state) {
    return (id) => {
      return state.people.filter((o) => o.organizationsPrimary.organization === id)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
