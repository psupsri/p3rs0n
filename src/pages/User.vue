<template>
  <div>
    <div class="field">
      <div class="control">
        <router-link to="new" append class="button is-primary">
          เพิ่มข้อมูล
        </router-link>
      </div>
    </div>
    <table class="table">
      <tr>
        <td>firstname</td>
        <td>lastname</td>
        <td>email</td>
        <td>role</td>
      </tr>
      <tr v-for="(user, i) in users" :key="i">
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>{{ user.email }}</td>
        <td v-if="user.roles.admin === true">admin</td>
        <td v-else>user</td>
      </tr>
    </table>
  </div>
</template>

<script>
// import { User } from '@/services'
import firebase from 'firebase'

export default {
  data: () => ({
    users: []
  }),
  created () {
    this.getUsers()
  },
  methods: {
    getUsers: async function () {
      firebase.database()
        .ref(`users`)
        .once('value', (snapshots) => {
          snapshots.forEach((snapshot) => {
            this.users.push(snapshot.val())
          })
        })
    }
  }
}
</script>
