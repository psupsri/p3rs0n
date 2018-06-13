<template>
  <div class="wrapper">
    <map></map>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '@/components/Icon'
import Map from '@/components/Map'

export default {
  components: {
    Icon,
    Map
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
