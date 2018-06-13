<template>
  <div class="columns">
    <div class="column">
      <search-input @search="getSearchResult"></search-input>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <td>ลำดับ</td>
            <td>ชื่อไทย</td>
            <td>ชื่ออังกฤษ</td>
            <td>ผู้ประสานงาน</td>
            <td>เบอร์โทรสำนักงาน</td>
            <td>อีเมล์สำนักงาน</td>
            <td>ที่ตั้งสำนักงาน</td>
            <td>พื้นที่ปฏิบัติงาน</td>
            <td>วัตถุประสงค์</td>
            <td>แหล่งเงินทุน</td>
          </tr>
        </thead>
        <tbody>
          <router-link :to="`/organization/id/${org._id}`" class="has-text-grey-darker" tag="tr" v-for="(org, i) in getOrgs" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ org.nameTH }}</td>
            <td>{{ org.nameEN }}</td>
            <td>{{ org.coordinator }}</td>
            <td>{{ org.tel }}</td>
            <td>{{ org.email }}</td>
            <td>{{ org.address.address }}</td>
            <td>{{ org.area }}</td>
            <td>{{ org.objective }}</td>
            <td>{{ org.investment }}</td>
          </router-link>
        </tbody>
      </table>
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
