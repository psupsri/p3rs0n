<template>
  <form @submit.prevent="save">
    <div class="columns">
      <div class="column is-4">
        <div class="field">
          <label class="label">ชื่อไทย</label>
          <div class="control">
            <input class="input" type="text" v-model="org.nameTH">
          </div>
        </div>
        <div class="field">
          <label class="label">ชื่ออังกฤษ</label>
          <div class="control">
            <input class="input" type="text" v-model="org.nameEN">
          </div>
        </div>
        <div class="field">
          <label class="label">ผู้ประสานงาน</label>
          <div class="control">
            <input class="input" type="text" v-model="org.coordinator">
          </div>
        </div>
        <div class="field">
          <label class="label">เบอร์โทรสำนักงาน</label>
          <div class="control">
            <input class="input" type="text" v-model="org.tel">
          </div>
        </div>
        <div class="field">
          <label class="label">อีเมล์สำนักงาน</label>
          <div class="control">
            <input class="input" type="text" v-model="org.email">
          </div>
        </div>
        <div class="field">
          <label class="label">ที่ตั้งสำนักงาน</label>
          <div class="control">
            <input type="text" class="input" placeholder="ที่อยู่" v-model="org.address.address">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <input type="text" class="input" placeholder="ตำบล" v-model="org.address.subDistrict">
          </div>
          <div class="control">
            <input type="text" class="input" placeholder="อำเภอ" v-model="org.address.district">
          </div>
          <div class="control">
            <input type="text" class="input" placeholder="จังหวัด" v-model="org.address.province">
          </div>
          <div class="control">
            <input type="text" class="input" placeholder="รหัสไปรษณีย์" v-model="org.address.zipcode">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">พื้นที่ปฏิบัติงาน</label>
          <div class="control">
            <input type="text" class="input" placeholder="พื้นที่ปฏิบัติงาน" v-model="org.area">
          </div>
        </div>
        <div class="field">
          <label class="label">วัตถุประสงค์</label>
          <div class="control">
            <input type="text" class="input" placeholder="วัตถุประสงค์" v-model="org.objective">
          </div>
        </div>
        <div class="field">
          <label class="label">แหล่งเงินทุน</label>
          <div class="control">
            <input type="text" class="input" placeholder="แหล่งเงินทุน" v-model="org.investment">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <input class="button is-success" type="submit" value="save">
      </div>
      <div class="control">
        <a class="button is-text" @click="back">cancel</a>
      </div>
    </div>
  </form>
</template>

<script>
import { OrgData } from '@/mixins'

export default {
  mixins: [OrgData],
  methods: {
    save () {
      this.$emit('save', this.org)
    },
    back () {
      this.$router.push('/organization')
    }
  }
}
</script>
