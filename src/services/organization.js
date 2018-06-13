import firebase from 'firebase'

const get = (cb) => {
  firebase.database()
    .ref(`organization`)
    .on('value', (snapshots) => {
      const result = []
      const key = Object.keys(snapshots.val())
      snapshots.forEach((snapshot) => {
        result.push(snapshot.val())
      })
      for (let i = 0; i < key.length; i++) {
        result[i]._id = key[i]
      }
      cb(result)
    })
}

const getById = (id, callback) => {
  firebase.database()
    .ref(`organization/${id}`)
    .on('value', (snapshot) => {
      callback(snapshot.val())
    })
}

const set = (data) => {
  return firebase.database()
    .ref(`organization`)
    .push(data)
}

export default {
  set,
  get,
  getById
}
