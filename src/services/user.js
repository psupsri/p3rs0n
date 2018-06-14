import firebase from 'firebase'

const getAllUsers = (cb) => {
  firebase.database()
    .ref(`users`)
    .once('value', (snapshots) => {
      let result = []
      snapshots.forEach((snapshot) => {
        result.push(snapshot.val())
      })
      cb(result)
    })
}
const get = (id, cb) => {
  firebase.database()
    .ref(`users/${id}`)
    .once('value', (snapshot) => {
      cb(snapshot.val())
    })
}

const set = (id, data) => {
  return firebase.database()
    .ref(`users/${id}`)
    .set(data)
}

const update = (id, data) => {
  return firebase.database()
    .ref(`users/${id}`)
    .update(data)
}

export default {
  get,
  getAllUsers,
  set,
  update
}
