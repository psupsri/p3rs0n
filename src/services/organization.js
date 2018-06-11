import firebase from 'firebase'

const set = (data) => {
  return firebase.database()
    .ref(`organization`)
    .push(data)
}

export default {
  set
}
