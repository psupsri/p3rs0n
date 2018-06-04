import firebase from 'firebase'

const upload = (task, cb1, cb2) => {
  let uploadTask = task
  uploadTask
    .on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      cb1(progress)
    }, (error) => {
      console.log(error)
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          let ref = uploadTask.snapshot.ref
          cb2(ref, downloadURL)
        })
    })
}

const uploadPhoto = (photo, cb1, cb2) => {
  let uploadTask = firebase.storage().ref(`files/photos/${Date.now()}`).put(photo)
  upload(uploadTask,
    (progress) => {
      cb1(progress)
    },
    (ref, downloadURL) => {
      cb2(downloadURL)
    }
  )
}

export default {
  uploadPhoto
}
