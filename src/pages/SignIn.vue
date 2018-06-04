<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-3">
            <div class="box">
              <form @submit.prevent="signIn">
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" v-model="email">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input" type="password" v-model="password">
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <input class="button is-link" type="submit" value="ตกลง">
                  </div>
                  <div class="control">
                    <input class="button is-text" type="reset" value="ยกเลิก">
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
