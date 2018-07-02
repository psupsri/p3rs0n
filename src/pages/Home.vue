<template>
  <div class="wrapper">
    <!-- <google-map :name="`name`"></google-map> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '@/components/Icon'
import GoogleMap from '@/components/GoogleMap'

export default {
  components: {
    Icon,
    GoogleMap
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

<style scoped>
.google-map {
  width: 800px !important;
  height: 600px !important;
  margin: 0 auto;
  background: gray;
}
</style>
