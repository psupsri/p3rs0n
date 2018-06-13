<template>
  <div>
    <navbar></navbar>
    <section class="section">
      <div class="columns">
        <!-- <div class="column is-2 is-hidden-touch">
          <side-menu></side-menu>
        </div> -->
        <div class="column is-offset-1 is-10">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/Navbar'
import SideMenu from '@/components/SideMenu'

export default {
  components: {
    Navbar,
    SideMenu
  },
  data: () => ({
    sorting: '_createdAt'
  }),
  created () {
    this.setpeople(this.sorting)
    this.$router.push('/home')
  },
  methods: {
    ...mapActions({
      setpeople: 'setpeople'
    })
  }
}
</script>

<style scoped>
.section {
  height: 100vh;
  background: #fefefe;
}
</style>
