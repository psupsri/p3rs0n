<template>
<div>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="control" v-if="admin">
          <router-link to="new" append class="button is-success">
            เพิ่มข้อมูล
          </router-link>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="field has-addons is-pulled-right">
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
    </div>
  </div>
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
        <router-link :to="`/people/id/${person._id}`" class="has-text-grey-darker" tag="tr" v-for="(person, i) in getPeople" :key="i">
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
    <div class="column is-2 has-text-centered person-box" v-for="(person, i) in getPeople" :key="i">
      <div class="person-with-avatar">
        <div class="top-right option-button" v-if="admin">
          <router-link :to="`/people/id/edit/${person._id}`" class="button is-info is-small" title="กดเพื่อแก้ไข">
            <icon :icon="`fa-edit`"></icon>
          </router-link>
          <button class="button is-danger is-small" title="กดเพื่อลบ" @click="toggleModal(i)">
            <icon :icon="`fa-trash`"></icon>
          </button>
        </div>
        <div class="avatar">
          <router-link :to="`/people/id/${person._id}`" class="has-text-grey-darker">
            <avatar :photo="person.photo"></avatar>
            <strong>{{ fullname(i) }}</strong>
          </router-link>
        </div>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Me } from '@/services'
import Icon from '@/components/Icon'
import Avatar from '@/components/Avatar'
import firebase from 'firebase'

export default {
  components: {
    Icon,
    Avatar
  },
  data: () => ({
    modal: null,
    show: 'photo',
    admin: false,
    sorting: '_createdAt'
  }),
  created () {
    this.getRole()
  },
  computed: {
    ...mapGetters({
      getPeople: 'getPeople'
    })
  },
  watch: {
    sorting () {
      this.setpeople(this.sorting)
    }
  },
  methods: {
    ...mapActions({
      setpeople: 'setpeople'
    }),
    sortData (v) {
      this.sorting = v
    },
    fullname (v) {
      return `${this.getPeople[v].firstname} ${this.getPeople[v].lastname}`
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
.top-right {
  position: absolute;
  top: 0;
  right: 0.5rem;
}
.top-left {
  position: absolute;
  top: 0;
  left: 0;
}
.avatar {
  margin-top: 1.25rem;
}
.option-button {
  display: none;
}
.person-box {
  position: relative;
  border: 1px solid #ffffff;
}
.person-box:hover {
  border-bottom: 1px solid #6b666a;
}
.person-box:hover .option-button {
  display: block;
}
</style>
