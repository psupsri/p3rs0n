import firebase from 'firebase'

const get = (cb) => {
  firebase.database()
    .ref(`organization`)
    .on('value', (snapshots) => {
      const result = []
      if (!snapshots.val()) return cb(result)
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

const getById = (id, cb) => {
  firebase.database()
    .ref(`organization/${id}`)
    .on('value', (snapshot) => {
      cb(snapshot.val())
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
