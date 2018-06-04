import firebase from 'firebase'

const get = (sorting, callback) => {
  firebase.database()
    .ref(`people`)
    .orderByChild(sorting)
    .on('value', (snapshots) => {
      const result = []
      const key = Object.keys(snapshots.val())
      snapshots.forEach((snapshot) => {
        result.push(snapshot.val())
      })
      for (let i = 0; i < key.length; i++) {
        result[i]._id = key[i]
      }
      callback(result)
    })
}

const getById = (id, callback) => {
  firebase.database()
    .ref(`people/${id}`)
    .on('value', (snapshot) => {
      callback(snapshot.val())
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
