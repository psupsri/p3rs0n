<template>
  <div class="box">
    <p class="title is-5">ระบบค้นหาข้อมูล</p>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Find a repository" v-model="words">
      </div>
      <p class="control">
        <span class="select">
          <select v-model="type">
            <option value="">กรุณาเลือกหมวดหมู่</option>
            <option value="firstname">ชื่อจริง</option>
            <option value="lastname">นามสกุล</option>
            <option value="email">อีเมล์</option>
            <option value="tel">เบอร์โทร</option>
            <option value="gender">เพศ</option>
            <option value="blood">กลุ่มเลือด</option>
            <option value="religion">ศาสนา</option>
            <option value="status">สถานภาพ</option>
          </select>
        </span>
      </p>
      <div class="control">
        <button class="button is-info" @click="search">
          ค้นหา
        </button>
      </div>
    </div>
    <div class="column">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <td>ลำดับ</td>
            <td>ชื่อจริง</td>
            <td>นามสกุล</td>
            <td>อีเมล์</td>
            <td>เบอร์โทร</td>
            <td>เพศ</td>
            <td>กลุ่มเลือด</td>
            <td>ศาสนา</td>
            <td>สถานภาพ</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import { People } from '@/services'
import firebase from 'firebase'

export default {
  data: () => ({
    words: '',
    type: ''
  }),
  methods: {
    search () {
      firebase.database()
        .ref(`people`)
        .orderByChild(this.type)
        .startAt(this.words)
        .on('value', (snapshot) => {
          console.log(snapshot.val())
        })
    }
  }
}
</script>
