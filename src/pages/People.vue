<template>
<div class="columns is-multiline">
  <div class="column is-12">
    <span class="title">ข้อมูลบุคคล</span><br>
  </div>
  <div class="column">
    <search-input @search="getSearchResult"></search-input>
    <div class="person-with-table" v-if="show === 'table'">
      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead class="thead">
          <tr>
            <th v-for="(h, hi) in [
              'ชื่อจริง', 'นามสกุล', 'อีเมล์', 'เบอร์โทร', 'เพศ', 'กลุ่มเลือด', 'ศาสนา', 'สถานภาพ'
            ]" :key="hi">{{ h }}</th>
            <th v-if="admin">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, i) in people" :key="i">
            <td v-for="(ph, phi) in ['firstname', 'lastname', 'email', 'tel', 'gender', 'blood', 'religion', 'status']" :key="phi">{{ person[ph] }}</td>
            <td v-if="admin">
              <div class="field is-grouped">
                <div class="control">
                  <router-link :to="`/people/id/${person._id}`" class="button is-success is-small" title="ดูรายละเอียด">
                    <icon :icon="`fa-sign-in`"></icon>
                  </router-link>
                </div>
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
          </tr>
        </tbody>
      </table>
    </div>
    <div class="columns is-multiline" v-if="show === 'photo'">
      <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-fifth-fullhd has-text-centered person-box" v-for="(person, i) in people" :key="i">
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
            <div class="avatar" :style="{ 'background-image': 'url(' + person.photo + ')' }" v-if="person.photo !== ''"></div>
            <div class="avatar" style="background: #f8f8f8;" v-else>
              <br>
              <p class="title">No photo</p>
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
  <div class="column is-2">
    <div class="field has-addons">
      <p class="control">
        <a class="button is-info show-button"
          :class="{ 'is-outlined': show !== 'table' }" @click="toggleShow('table')" title="แสดงแบบตาราง">
          <icon :icon="`fa fa-table`"></icon>
        </a>
      </p>
      <p class="control">
        <a class="button is-info show-button"
          :class="{ 'is-outlined': show !== 'photo' }" @click="toggleShow('photo')" title="แสดงแบบรูปภาพ">
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
    delPeople (id) {
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
.thead {
  background: #ffdd57;
}
</style>
