<template>
  <div class="wrapper">
    <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '@/components/Icon'

export default {
  components: {
    Icon
  },
  created () {
    this.setusers()
    this.setorgs()
  },
  computed: {
    ...mapGetters({
      getPeople: 'getPeople',
      getUsers: 'getUsers',
      getOrgs: 'getOrgs'
    })
  },
  methods: {
    ...mapActions({
      setusers: 'setusers',
      setorgs: 'setorgs'
    })
  }
}
</script>
