<template>
<div class="columns is-multiline">
  <div class="column is-12">
    <span class="title">ข้อมูลองค์กร</span><br>
  </div>
  <div class="column">
    <!-- <search-input @search="getSearchResult"></search-input> -->
    <div class="columns is-multiline">
      <div class="column is-4">
        <div class="card" v-for="(org, i) in getOrgs" :key="i">
          <div class="card-content">
            <p class="title">
              {{ org.nameTH }}
            </p>
            <p class="subtitle">
              {{ org.coordinator }}
              {{ org.area }}
              {{ org.objective }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="column is-3">
    <div class="field">
      <div class="control is-expanded">
        <router-link to="new" append class="button is-info">
          Create New
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SearchInput from '@/components/Searchinput'

export default {
  components: {
    SearchInput
  },
  computed: {
    getOrgs () {
      return this.$store.getters.getOrgs
    }
  },
  methods: {
    getSearchResult () {
      console.log('eiei')
    }
  }
}
</script>
