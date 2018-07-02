// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import * as VueGoogleMaps from 'vue2-google-maps'

import App from './App'
import store from './store'

import router from './router'
import { Auth } from './services'

import 'bulma/css/bulma.min.css'
import 'font-awesome/css/font-awesome.min.css'

var config = {
  apiKey: 'AIzaSyCiV_iz4mkzTR2V_hGA2zcNGjQyaTJWUIs',
  authDomain: 'commu-p3rs0n.firebaseapp.com',
  databaseURL: 'https://commu-p3rs0n.firebaseio.com',
  projectId: 'commu-p3rs0n',
  storageBucket: 'commu-p3rs0n.appspot.com',
  messagingSenderId: '147895040466'
}

firebase.initializeApp(config)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDQZs5Bu5DQgRvFp6RzMMiI8o4fnbxXL1c',
    libraries: 'places, drawing, visualization'
  }
})

Vue.filter('toUpper', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.requiresAuth)) {
    Auth.requiresUser()
      .then(() => {
        next()
      }, () => {
        next({ path: '/signin' })
      })
    return
  }
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  ...App
})
