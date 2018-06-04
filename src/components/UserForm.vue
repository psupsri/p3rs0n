<template>
  <form @submit.prevent="save">
    <div class="field">
      <label class="label">Firstname</label>
      <div class="control">
        <input class="input" type="text" v-model="user.firstname">
      </div>
    </div>
    <div class="field">
      <label class="label">Lastname</label>
      <div class="control">
        <input class="input" type="text" v-model="user.lastname">
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="text" v-model="user.email">
      </div>
      <p class="help is-danger" v-if="!emailRegex()">This email is invalid</p>
      <p class="help is-success" v-else>This email is available</p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="user.password">
      </div>
      <p class="help is-danger" v-if="!passRegex()">This password is invalid</p>
      <p class="help is-success" v-else>This password is available</p>
    </div>
    <div class="field">
      <label class="label">Re-Password</label>
      <div class="control">
        <input class="input" type="password" v-model="user.rePassword">
      </div>
      <p class="help is-danger" v-if="!comparePass()">Password not matched</p>
      <p class="help is-success" v-else>Password is matched</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" :disabled="!disSubmit">Submit</button>
      </div>
      <div class="control">
        <a class="button is-text" @click="back">Cancel</a>
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import { UserData } from '@/mixins'
export default {
  mixins: [UserData],
  computed: {
    disSubmit () {
      return this.passRegex() && this.comparePass() && this.emailRegex()
    }
  },
  methods: {
    emailRegex () {
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailRegex.test(this.user.email)) return false
      return true
    },
    passRegex () {
      let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,16})/
      if (passRegex.test(this.user.password)) return true
      return false
    },
    comparePass () {
      if (this.user.password === this.user.rePassword) return true
      return false
    },
    save () {
      this.user.firstname.toLowerCase()
      this.user.lastname.toLowerCase()
      this.$emit('save', this.user)
    },
    back () {
      this.$router.push('/user')
    }
  }
}
</script>
