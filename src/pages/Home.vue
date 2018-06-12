<template>
  <div class="box">
    <div class="columns is-multiline">
      <div class="column is-3">
        <router-link to="/people" class="has-text-info">
          <div class="card">
            <header class="card-header has-background-info">
              <p class="card-header-title has-text-white">
                ข้อมูลบุคคล
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fa fa-caret-right" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                <div class="columns">
                  <div class="column">
                    <icon :icon="`fa fa-user`"></icon>
                  </div>
                  <div class="column">
                    {{ getPeople.length }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="column is-3">
      </div>
    </div>
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

<style scoped>
.content {
  font-size: 3rem;
}
</style>
