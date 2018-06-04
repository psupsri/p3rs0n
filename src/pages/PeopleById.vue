<template>
  <div class="box" v-if="peopleData">
    <div class="columns is-multiline">
      <div class="column is-9">
        <span class="title">
          {{ checkData(fullname) | toUpper }}.
        </span>
      </div>
      <div class="column is-3">
        <router-link :to="`/people/id/edit/${peopleData._id}`" class="button is-info is-pulled-right" title="กดเพื่อแก้ไข">
          <icon :icon="`fa-edit`"></icon>
        </router-link>
      </div>
      <div class="column is-6">
        <figure class="image">
          <img :src="peopleData.photo" class="image-cover" v-if="peopleData.photo">
          <img src="@/assets/files/photos/nophoto.png" class="image-cover" v-else>
        </figure>
      </div>
      <div class="column box">
        <p class="title is-5">ข้อมูลทั่วไป</p>
        <strong><icon :icon="` fa fa-venus-mars`" :color="`has-text-dark`"></icon>เพศ: </strong>
        <span>{{ peopleData.gender }}</span><br>
        <strong><icon :icon="`fa fa-heart`" :color="`has-text-danger`"></icon>อายุ: </strong> {{ age() }} ปี<br>
        <strong><icon :icon="`fa-at`" :color="`has-text-link`"></icon>อีเมล์: </strong><span>{{ checkData(peopleData.email) }}</span><br>
        <strong><icon :icon="`fa fa-phone`" :color="`has-text-primary`"></icon>โทร: </strong><span>{{ checkData(peopleData.tel) }}</span><br>
        <strong><icon :icon="`fa fa-tint`" :color="`has-text-danger`"></icon>กลุ่มเลือด: </strong> {{ checkData(peopleData.blood) }}<br>
        <strong><icon :icon="`fa fa-book`" :color="`has-text-dark`"></icon>ศาสนา: </strong> {{ checkData(peopleData.religion) }}<br>
        <strong><icon :icon="`fa fa-venus-mars`" :color="`has-text-success`"></icon>สถานภาพ:</strong> {{ checkData(peopleData.status) }}<br>
        <div v-if="peopleData.address">
          <strong><icon :icon="`fa fa-home`" :color="`has-text-primary`"></icon>ที่อยู่:</strong>
          {{ peopleData.address.address }}
          {{ peopleData.address.subDistrict }}
          {{ peopleData.address.district }}
          {{ peopleData.address.province }}
          {{ peopleData.address.zipcode }}
        </div>
        <a class="subtitle" :href="`https://www.${social.host}.com/${social.account}`" target="_blank" v-for="(social, s) in peopleData.socials" :key="`social${s}`">
          <icon :icon="`fa fa-${social.host}`" :color="`has-text-${social.host}`" title="คลิ๊กเพื่อชมบัญชีโซเชี่ยล"></icon>
        </a>
        <hr>
        <p class="title is-5">อาชีพ/องค์กร</p>
        <strong><icon :icon="`fa fa-briefcase`" :color="`has-text-dark`"></icon>อาชีพ: </strong> {{ checkData(peopleData.organizationsPrimary.job) }}<br>
        <strong><icon :icon="`fa fa-building`" :color="`has-text-dark`"></icon>องค์กร: </strong> {{ checkData(peopleData.organizationsPrimary.organization) }}<br>
        <strong><icon :icon="`fa fa-user`" :color="`has-text-dark`"></icon>ตำแหน่ง: </strong> {{ checkData(peopleData.organizationsPrimary.position) }}<br>
        <strong><icon :icon="`fa fa-dollar`" :color="`has-text-dark`"></icon>เงินเดือน: </strong> {{ checkData(peopleData.organizationsPrimary.salary) }}<br>
        <hr>
        <div v-for="(working, w) in peopleData.organizations" :key="`working${w}`" v-if="peopleData.organizations.job === ''">
          <strong><icon :icon="`fa fa-briefcase`" :color="`has-text-dark`"></icon>อาชีพ: </strong> {{ checkData(working.job) }}<br>
          <strong><icon :icon="`fa fa-building`" :color="`has-text-dark`"></icon>องค์กร: </strong> {{ checkData(working.organization) }}<br>
          <strong><icon :icon="`fa fa-user`" :color="`has-text-dark`"></icon>ตำแหน่ง: </strong> {{ checkData(working.position) }}<br>
          <strong><icon :icon="`fa fa-dollar`" :color="`has-text-dark`"></icon>เงินเดือน: </strong> {{ checkData(working.salary) }}<br>
          <hr>
        </div>
        <div v-for="(school, sc) in peopleData.schools" :key="`school${sc}`" v-if="peopleData.schools.school === ''">
          <p class="title is-5">การศึกษา</p>
          {{ checkData(school.school) }}
          {{ checkData(school.level) }}
          {{ checkData(school.faculty) }}
        </div>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column is-half-tablet is-one-quarter-desktop is-one-fifth-widescreen has-text-centered person-box" v-for="(p, s) in getPeopleSimilar" :key="s">
        <div class="person-with-avatar">
        <div class="avatar">
          <router-link :to="`/people/id/${p._id}`" class="has-text-grey-darker">
            <avatar :photo="p.photo"></avatar>
            <strong>{{ p.firstname }} {{ p.lastname }}</strong><br>
            <small v-for="(ps, st) in p.similar" :key="st">{{ ps }}</small>
          </router-link>
        </div>
      </div>
      </div>
    </div>
    <hr>
    <!-- <pagination :listData="['1', '2', '3']" :size="pageSize" @changePage="changePage"></pagination> -->
  </div>
</template>

<script>
import moment from 'moment'
import Icon from '@/components/Icon'
import Avatar from '@/components/Avatar'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Icon,
    Avatar,
    Pagination
  },
  data: () => ({
    id: null,
    peopleData: null,
    pageSize: 5
  }),
  created () {
    this.reload()
  },
  computed: {
    fullname () {
      return this.peopleData.firstname + ' ' + this.peopleData.lastname
    },
    getPeopleById () {
      return this.$store.getters.getPeopleById(this.id)
    },
    getPeopleSimilar () {
      return this.$store.getters.getPeopleSimilar(this.id)
    }
  },
  watch: {
    $route () {
      this.reload()
    },
    getPeopleById () {
      this.peopleData = this.getPeopleById[0]
    }
  },
  methods: {
    reload () {
      this.id = this.$route.params.id
    },
    checkData (data) {
      if (data === '') return 'ไม่มีข้อมูล'
      return data
    },
    age () {
      if (!this.peopleData.birthday) return 'No Data'
      if (this.peopleData.birthday === '') return 'No Data'
      let value = this.peopleData.birthday.replace(/-/g, '')
      return moment(value, 'YYYYMMDD').fromNow().split(' ')[0]
    }
  }
}
</script>

<style scoped>
.has-text-twitter {
  color: #41abe1;
}
.has-text-facebook {
  color: #4267b2;
}
.has-text-instagram {
  color: #e03a66;
}
.p-button {
  border: 1px solid #209cee;
  border-left: 3px solid #209cee;
  color: #209cee;
  border-radius: 0;
  margin: 0px;
}
.p-button.is-active {
  border-left: 3px solid #209cee;
  background: #ffef61;
}
.button:focus:not(:active), .button.is-focused:not(:active) {
  box-shadow: none;
}
.person-box {
  position: relative;
  border: 1px solid #ffffff;
}
.person-box:hover {
  border-bottom: 1px solid #6b666a;
}
.image {
  width: 100%;
  min-width: 100%;
  height: 370px;
  max-height: 370px;
}
.image-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
