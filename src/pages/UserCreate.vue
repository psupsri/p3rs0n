<template>
  <div>
    <user-form @save="save"></user-form>
  </div>
</template>

<script>
import firebase from 'firebase'
import { User } from '@/services'
import { UserData } from '@/mixins'

import UserForm from '@/components/UserForm'

export default {
  mixins: [UserData],
  components: {
    UserForm
  },
  methods: {
    save (value) {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then((res) => {
          let user = res.user
          User.set(user.uid, {
            email: user.email,
            firstname: value.firstname,
            lastname: value.lastname,
            roles: {
              admin: false
            }
          })
            .then(() => {
              this.$router.push('/')
            })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    back () {
      this.$router.push('/user')
    }
  }
}
</script>
