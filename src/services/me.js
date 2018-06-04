import Auth from './auth'
import User from './user'

const getId = () => Auth.getCurrentUser().uid

const get = (callback) => {
  User.get(getId(), callback)
}

const set = (data) => {
  return User.set(getId(), data)
}

const update = (data) => {
  return User.update(getId(), data)
}

export default {
  getId,
  get,
  set,
  update
}
