<template>
  <form @submit.prevent="save">
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
        <input type="text" class="input" placeholder="ที่อยู่">
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <input type="text" class="input" placeholder="ตำบล">
      </div>
      <div class="control">
        <input type="text" class="input" placeholder="อำเภอ">
      </div>
      <div class="control">
        <input type="text" class="input" placeholder="จังหวัด">
      </div>
      <div class="control">
        <input type="text" class="input" placeholder="รหัสไปรษณีย์">
      </div>
    </div>
    <div class="field">
      <label class="label">ลักษณะของธุรกิจ</label>
      <div class="control">
        <input type="text" class="input" placeholder="ลักษณะของธุรกิจ" v-model="org.job">
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
