<template>
  <form @submit.prevent="save">
    <div class="columns">
      <div class="column is-4">
        <div class="field">
          <input-box :type="`text`" :label="`ชื่อไทย`" v-model="org.nameTH"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`ชื่ออังกฤษ`" v-model="org.nameEN"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`ชื่อย่อไทย`" v-model="org.nameShTH"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`ชื่อย่ออังกฤษ`" v-model="org.nameShEN"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`เบอร์โทรสำนักงาน`" v-model="org.tel"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`อีเมล์สำนักงาน`" v-model="org.email"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`ที่ตั้งสำนักงาน`" v-model="org.address.address"></input-box>
        </div>
        <div class="field is-grouped">
          <input-box :type="`text`" :placeholder="`ที่ตั้งสำนักงาน`" v-model="org.address.tambon"></input-box>
          <input-box :type="`text`" :placeholder="`อำเภอ`" v-model="org.address.amphoe"></input-box>
          <input-box :type="`text`" :placeholder="`จังหวัด`" v-model="org.address.province"></input-box>
          <input-box :type="`text`" :placeholder="`รหัสไปรษณีย์`" v-model="org.address.postcode"></input-box>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <input-box :type="`text`" :label="`ผู้ประสานงาน`" v-model="org.coordinator"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`พื้นที่ปฏิบัติงาน`" v-model="org.area"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`วัตถุประสงค์`" v-model="org.objective"></input-box>
        </div>
        <div class="field">
          <label class="label">แหล่งเงินทุน</label>
          <div class="control">
            <input-box :type="`text`" :label="`แหล่งเงินทุน`" v-model="org.investment"></input-box>
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
import InputBox from '@/components/InputBox'

export default {
  mixins: [OrgData],
  components: {
    InputBox
  },
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
