<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="control">
            <router-link to="new" append class="button is-success">
              เพิ่มข้อมูล
            </router-link>
          </div>
        </div>
      </div>
    </div>
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
        <router-link :to="`/organization/id/${i}`" class="has-text-grey-darker" tag="tr" v-for="(org, i) in getOrgs" :key="i">
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
</template>

<script>
export default {
  computed: {
    getOrgs () {
      return this.$store.getters.getOrgs
    }
  }
}
</script>
