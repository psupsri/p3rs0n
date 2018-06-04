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
  getPeopleSimilar (state) {
    return (id) => {
      let sp = _.forEach(state.people, (val) => {
        val.similar = []
      })
      let i = _.filter(sp, {'_id': id})
      let p = sp.filter((s) => {
        s.similar.push('สังกัดองค์กรเดียวกัน')
        return s.organizationsPrimary.organization === i[0].organizationsPrimary.organization && s._id !== i[0]._id
      })
      // console.log(p)
      return p
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
