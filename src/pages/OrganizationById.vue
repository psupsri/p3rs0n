<template>
  <div v-if="orgData">
    ข้อมูลองค์กร
    <div class="columns">
      <div class="column is-2">
        {{ orgData.nameTH }}<br>
        {{ orgData.nameEN }}<br>
        {{ orgData.coordinator }}<br>
        {{ orgData.tel }}<br>
        {{ orgData.email }}<br>
        {{ orgData.area }}<br>
        {{ orgData.objective }}<br>
        {{ orgData.investment }}<br>
      </div>
      <div class="column is-offset-1 is-9">
        <div class="columns is-multiline">
          <div class="column is-3 person-box" v-for="(person, i) in getPeopleByOrg" :key="i">
            <div>
              <router-link :to="`/people/id/${person._id}`" class="has-text-grey-darker">
                <div class="avatar" :style="{ 'background-image': 'url(' + person.photo + ')' }">
                  <!-- <avatar :photo="person.photo"></avatar> -->
                </div>
              </router-link>
              <strong>{{ person.firstname + ' ' + person.lastname }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: null,
    orgData: null,
    pageSize: 5
  }),
  created () {
    this.reload()
  },
  computed: {
    getOrgById () {
      return this.$store.getters.getOrgById(this.id)
    },
    getPeopleByOrg () {
      return this.$store.getters.getPeopleByOrg(this.id)
    }
  },
  watch: {
    $route () {
      this.reload()
    },
    getOrgById () {
      this.orgData = this.getOrgById[0]
    }
  },
  methods: {
    reload () {
      this.id = this.$route.params.id
    }
  }
}
</script>

<style scoped>
.avatar {
  height: 180px;
  max-height: 180px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
