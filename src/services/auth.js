import firebase from 'firebase'

const getCurrentUser = () => firebase.auth().currentUser

const requiresUser = (callback) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      if (user) {
        resolve(user)
        return
      }
      reject(new Error('No User'))
    })
  })
}

export default {
  getCurrentUser,
  requiresUser
}
