<template>
  <nav class="navbar is-spaced is-info is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" style="background: grey">
          <!-- <img src="@/assets/logo.png" width="112" height="28"> -->
          <img width="112" height="28">
        </a>
        <a role="button" class="navbar-burger" :class="{ 'is-active': burger }" @click="toggleBurger">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': burger }">
        <div class="navbar-start">
          <router-link to="/home" class="navbar-item" exact>
            <span>หน้าแรก</span>
          </router-link>
          <router-link to="/people" class="navbar-item" exact>
            <span>ข้อมูลบุคคล</span>
          </router-link>
          <!-- <router-link to="/user" class="navbar-item" exact v-if="admin">
            <icon :class="`has-text-info`" :icon="`fa-user fa-lg`"></icon>&nbsp;
            <span>ข้อมูลผู้ใช้ระบบ</span>
          </router-link> -->
          <router-link to="/organization" class="navbar-item" exact v-if="admin">
            <span>ข้อมูลองค์กร</span>
          </router-link>
        </div>
        <div class="navbar-end">
          <a class="button navbar-item has-text-info" @click="signOut">
            <span>ออกจากระบบ</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
import { Me } from '@/services'

import Icon from '@/components/Icon'

export default {
  components: {
    Icon
  },
  data: () => ({
    currentUser: null,
    burger: false,
    admin: false
  }),
  created () {
    this.checkAuthState()
    this.getRole()
  },
  methods: {
    signOut: async function () {
      await firebase.auth().signOut()
        .then(() => {
          this.$router.push('/signin')
        })
    },
    checkAuthState () {
      firebase.auth().onAuthStateChanged((user) => {
        this.currentUser = user
      })
    },
    toggleBurger: function () {
      if (this.burger) {
        this.burger = false
        return
      }
      this.burger = true
    },
    getRole: async function () {
      await Me.get((data) => {
        this.admin = data.roles.admin
      })
    }
  }
}
</script>

<style scoped>
a.navbar-item:hover {
  background: none !important;
  color: #fff27b !important;
}
a.navbar-item.is-active {
  background: none !important;
  color: #fed837 !important;
}
</style>
