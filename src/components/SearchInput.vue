<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Find a repository" v-model="words">
    </div>
    <p class="control">
      <span class="select">
        <select v-model="type">
          <option value="">เลือก</option>
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
</template>

<script>
// import { People } from '@/services'
import firebase from 'firebase'

export default {
  props: ['choice'],
  data: () => ({
    words: '',
    type: '',
    result: []
  }),
  methods: {
    search () {
      if (this.type === '' || this.words === '') return this.$emit('search')
      let word = this.words.trim()
      firebase.database()
        .ref(`people`)
        .orderByChild(this.type)
        .equalTo(word)
        .on('value', (snapshot) => {
          this.result = snapshot.val()
        })
      if (!this.result) {
        this.result = {firstname: 'No Result'}
      }
      this.$emit('search', this.result)
    }
  }
}
</script>
