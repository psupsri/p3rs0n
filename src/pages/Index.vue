<template>
  <div>
    <navbar></navbar>
    <section class="section">
      <div class="columns index-content">
        <div class="column is-offset-1 is-10 box">
          <router-view/>
        </div>
      </div>
    </section>
    <foot></foot>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/Navbar'
import SideMenu from '@/components/SideMenu'
import Foot from '@/components/Foot'

export default {
  components: {
    Navbar,
    SideMenu,
    Foot
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
  margin-top: 80px;
  margin-bottom: 80px;
}
</style>
