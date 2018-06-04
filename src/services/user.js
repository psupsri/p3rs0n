import firebase from 'firebase'

const getAllUsers = (callback) => {
  firebase.database()
    .ref(`users`)
    .once('value', (snapshots) => {
      let result = []
      snapshots.forEach((snapshot) => {
        result.push(snapshot.val())
      })
      callback(result)
    })
}
const get = (id, callback) => {
  firebase.database()
    .ref(`users/${id}`)
    .once('value', (snapshot) => {
      callback(snapshot.val())
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
