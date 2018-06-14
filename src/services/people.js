import firebase from 'firebase'

const get = (sorting, cb) => {
  firebase.database()
    .ref(`people`)
    .orderByChild(sorting)
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
    .ref(`people/${id}`)
    .on('value', (snapshot) => {
      cb(snapshot.val())
    })
}

const set = (data) => {
  return firebase.database()
    .ref(`people`)
    .push(data)
}

const update = (id, data) => {
  return firebase.database()
    .ref(`people/${id}`)
    .update(data)
}

export default {
  get,
  getById,
  set,
  update
}
