<template>
<div>
  <div class="columns">
    <div class="column">
      <search-input @search="getSearchResult"></search-input>
      <div class="person-with-table" v-if="show === 'table'">
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <td @click="sortData('_createdAt')">ลำดับ<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td @click="sortData('firstname')">ชื่อจริง<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td @click="sortData('lastname')">นามสกุล<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td @click="sortData('email')">อีเมล์<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td @click="sortData('tel')">เบอร์โทร<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td @click="sortData('gender')">เพศ<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td @click="sortData('blood')">กลุ่มเลือด<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td @click="sortData('religion')">ศาสนา<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td @click="sortData('status')">สถานภาพ<span class="icon"><i class="fa fa-sort-desc"></i></span></td>
              <td v-if="admin">จัดการ</td>
            </tr>
          </thead>
          <tbody>
            <router-link :to="`/people/id/${person._id}`" class="has-text-grey-darker" tag="tr" v-for="(person, i) in people" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ person.firstname }}</td>
              <td>{{ person.lastname }}</td>
              <td>{{ person.email }}</td>
              <td>{{ person.tel }}</td>
              <td>{{ person.gender }}</td>
              <td>{{ person.blood }}</td>
              <td>{{ person.religion }}</td>
              <td>{{ person.status }}</td>
              <td v-if="admin" style="z-index: 1000;">
                <div class="field is-grouped">
                  <div class="control">
                    <router-link :to="`/people/id/edit/${person._id}`" class="button is-info is-small" title="กดเพื่อแก้ไข">
                      <icon :icon="`fa-edit`"></icon>
                    </router-link>
                  </div>
                  <div class="control">
                    <button class="button is-danger is-small" title="กดเพื่อลบ" @click="toggleModal(i)">
                      <icon :icon="`fa-trash`"></icon>
                    </button>
                  </div>
                </div>
              </td>
              <div class="modal is-active" v-if="i === modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                  <header class="modal-card-head">
                    <p class="modal-card-title">ลบข้อมูล {{ fullname(i) }}</p>
                    <button class="delete" aria-label="close" @click="toggleModal"></button>
                  </header>
                  <section class="modal-card-body">
                    ข้อมูลที่ถูกลบไปจะไม่สามารถกู้คืนได้
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button is-success" @click="delPeople(person._id)">ยืนยัน</button>
                    <button class="button is-danger" @click="toggleModal">ยกเลิก</button>
                  </footer>
                </div>
              </div>
            </router-link>
          </tbody>
        </table>
      </div>
      <div class="columns is-multiline" v-if="show === 'photo'">
        <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd has-text-centered person-box" v-for="(person, i) in people" :key="i">
          <div>
            <div v-if="admin" class="option-button">
              <div class="field is-grouped">
                <div class="control">
                  <router-link :to="`/people/id/edit/${person._id}`" class="button edit is-info" title="กดเพื่อแก้ไข">
                    <icon :icon="`fa-edit`"></icon>
                  </router-link>
                </div>
                <div class="control">
                  <button class="button del is-danger" title="กดเพื่อลบ" @click="toggleModal(i)">
                    <icon :icon="`fa-trash`"></icon>
                  </button>
                </div>
              </div>
            </div>
            <router-link :to="`/people/id/${person._id}`" class="has-text-grey-darker">
              <div class="avatar" :style="{ 'background-image': 'url(' + person.photo + ')' }">
                <!-- <avatar :photo="person.photo"></avatar> -->
              </div>
            </router-link>
            <strong>{{ fullname(i) }}</strong>
          </div>
          <div class="modal is-active" v-if="i === modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">ลบข้อมูล {{ fullname(i) }}</p>
                <button class="delete" aria-label="close" @click="toggleModal"></button>
              </header>
              <section class="modal-card-body">
                ข้อมูลที่ถูกลบไปจะไม่สามารถกู้คืนได้
              </section>
              <footer class="modal-card-foot">
                <button class="button is-success" @click="delPeople(person._id)">ยืนยัน</button>
                <button class="button is-danger" @click="toggleModal">ยกเลิก</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-3">
      <div class="field has-addons">
        <p class="control">
          <a class="button is-info " :class="{ 'is-outlined': show !== 'table' }" @click="toggleShow('table')" title="แสดงแบบตาราง">
            <icon :icon="`fa fa-table`"></icon>
          </a>
        </p>
        <p class="control">
          <a class="button is-info " :class="{ 'is-outlined': show !== 'photo' }" @click="toggleShow('photo')" title="แสดงแบบรูปภาพ">
            <icon :icon="`fa fa-image`"></icon>
          </a>
        </p>
      </div>
      <div class="field">
        <div class="control is-expanded" v-if="admin">
          <router-link to="new" append class="button is-info">
            Create New
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

import { mapGetters, mapActions } from 'vuex'
import { Me } from '@/services'

import Icon from '@/components/Icon'
import Avatar from '@/components/Avatar'
import SearchInput from '@/components/Searchinput'

export default {
  components: {
    Icon,
    Avatar,
    SearchInput
  },
  data: () => ({
    modal: null,
    show: 'photo',
    admin: false,
    people: [],
    sorting: '_createdAt'
  }),
  created () {
    this.getRole()
    this.reload()
  },
  computed: {
    ...mapGetters({
      getPeople: 'getPeople'
    })
  },
  watch: {
    sorting () {
      this.setpeople(this.sorting)
    },
    getPeople () {
      this.reload()
    }
  },
  methods: {
    ...mapActions({
      setpeople: 'setpeople'
    }),
    reload () {
      this.people = this.getPeople
    },
    getSearchResult (result) {
      if (!result) return this.reload()
      this.people = result
    },
    sortData (v) {
      this.sorting = v
    },
    fullname (v) {
      return `${this.people[v].firstname} ${this.people[v].lastname}`
    },
    toggleModal (i) {
      this.modal = i
    },
    toggleShow (val) {
      this.show = val
    },
    delPeople: async function (id) {
      firebase.database()
        .ref(`people/${id}`)
        .remove()
      this.toggleModal()
    },
    getRole: async function () {
      await Me.get((data) => {
        this.admin = data.roles.admin
      })
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
.option-button {
  position: absolute;
  display: none;
  top: 10%;
  right: 10%;
  z-index: 999;
}
.person-box {
  position: relative;
}
.person-box:hover .option-button {
  display: block;
}
.person-box:hover .avatar {
  opacity: 0.7;
}
</style>
