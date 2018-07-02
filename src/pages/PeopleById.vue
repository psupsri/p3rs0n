<template>
  <div v-if="personData">
    <div class="columns">
      <div class="column is-3">
        <span class="title">
          {{ checkData(fullname) | toUpper }}.
        </span>
      </div>
      <div class="column is-1">
        <router-link :to="`/people/id/edit/${personData._id}`" class="button is-info is-pulled-right" title="กดเพื่อแก้ไข">
          <icon :icon="`fa-edit`"></icon>
        </router-link>
      </div>
    </div>
    <div class="columns">
      <div class="column is-3">
        <figure class="image">
          <img :src="personData.photo" class="image-cover" v-if="personData.photo">
          <img src="@/assets/files/photos/nophoto.jpg" class="image-cover" v-else>
        </figure>
        <br>
        <strong><icon :icon="`fa fa-venus-mars`" :color="`has-text-dark`"></icon>เพศ: </strong><span>{{ checkData(personData.gender) }}</span><br>
        <strong><icon :icon="`fa fa-heart`" :color="`has-text-dark`"></icon>อายุ: </strong> {{ age() }} ปี<br>
        <strong><icon :icon="`fa fa-at`" :color="`has-text-dark`"></icon>อีเมล์: </strong><span>{{ checkData(personData.email) }}</span><br>
        <strong><icon :icon="`fa fa-phone`" :color="`has-text-dark`"></icon>โทร: </strong><span>{{ checkData(personData.tel) }}</span><br>
        <strong><icon :icon="`fa fa-tint`" :color="`has-text-dark`"></icon>กลุ่มเลือด: </strong> {{ checkData(personData.blood) }}<br>
        <strong><icon :icon="`fa fa-book`" :color="`has-text-dark`"></icon>ศาสนา: </strong> {{ checkData(personData.religion) }}<br>
        <strong><icon :icon="`fa fa-user`" :color="`has-text-dark`"></icon>สถานภาพ:</strong> {{ checkData(personData.status) }}<br>
        <div v-if="personData.address">
          <strong><icon :icon="`fa fa-home`" :color="`has-text-dark`"></icon>ที่อยู่:</strong>
          {{ personData.address.address }}
          {{ personData.address.subDistrict }}
          {{ personData.address.district }}
          {{ personData.address.province }}
          {{ personData.address.zipcode }}
        </div>
        <a class="subtitle" :href="`https://www.${social.host}.com/${social.account}`" target="_blank" v-for="(social, s) in personData.socials" :key="`social${s}`" v-if="personData.socials">
          <icon :icon="`fa fa-${social.host}`" :color="`has-text-${social.host}`" title="คลิ๊กเพื่อชมบัญชีโซเชี่ยล"></icon>
        </a>
      </div>
      <div class="column is-3">
        <p class="title is-5">อาชีพ/องค์กร</p>
        <strong><icon :icon="`fa fa-briefcase`" :color="`has-text-dark`"></icon>อาชีพ: </strong> {{ checkData(personData.occupation.job) }}<br>
        <strong><icon :icon="`fa fa-building`" :color="`has-text-dark`"></icon>องค์กร: </strong> <span v-if="getOrgName.length === 0">ไม่มีข้อมูล</span><span v-else>{{ getOrgName[0].nameTH }}</span><br>
        <strong><icon :icon="`fa fa-user`" :color="`has-text-dark`"></icon>ตำแหน่ง: </strong> {{ checkData(personData.occupation.position) }}<br>
        <strong><icon :icon="`fa fa-dollar`" :color="`has-text-dark`"></icon>เงินเดือน: </strong> {{ checkData(personData.occupation.salary) }}<br>
        <br>
        <div v-for="(school, sc) in personData.education" :key="`school${sc}`" v-if="personData.education">
          <p class="title is-5">การศึกษา</p>
          <strong><icon :icon="`fa fa-building`" :color="`has-text-dark`"></icon>สถานศึกษา: </strong> {{ checkData(school.school) }}<br>
          <strong><icon :icon="`fa fa-graduation-cap`" :color="`has-text-dark`"></icon>ระดับ: </strong> {{ checkData(school.level) }}<br>
          <strong><icon :icon="`fa fa-book`" :color="`has-text-dark`"></icon>สาขาวิชา: </strong> {{ checkData(school.faculty) }}<br>
        </div>
      </div>
      <div class="column is-6">
        <div class="columns is-multiline">
          <div class="column is-12">
            <span class="title">
              ผู้เกี่ยวข้อง
            </span>
          </div>
          <div class="column is-12" v-if="getPeopleOrgSimilar.length > 0">
            <p class="subtitle">สังกัดองค์กรเดียวกัน</p>
            <div class="columns">
              <div class="column is-3" v-for="(p, s) in getPeopleOrgSimilar" :key="`po-` + s">
                <div class="person-with-avatar">
                  <div class="avatar">
                    <router-link :to="`/people/id/${p._id}`" class="has-text-grey-darker">
                      <avatar :photo="p.photo" :height="140"></avatar>
                      <strong>{{ p.firstname }} {{ p.lastname }}</strong><br>
                      <small v-for="(ps, st) in p.similar" :key="st">{{ ps }}</small>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
          <div class="column is-12" v-if="getPeopleSchoolSimilar.length > 0">
            <p class="subtitle">ศึกษาสถาบันเดียวกัน</p>
            <div class="columns">
              <div class="column is-3" v-for="(p, s) in getPeopleSchoolSimilar" :key="`ps-` + s">
                <div class="person-with-avatar">
                  <div class="avatar">
                    <router-link :to="`/people/id/${p._id}`" class="has-text-grey-darker">
                      <avatar :photo="p.photo" :height="140"></avatar>
                      <strong>{{ p.firstname }} {{ p.lastname }}</strong><br>
                      <small v-for="(ps, st) in p.similar" :key="st">{{ ps }}</small>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
    </div>
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
    personData: null,
    pageSize: 5
  }),
  created () {
    this.reload()
  },
  computed: {
    fullname () {
      return this.personData.firstname + ' ' + this.personData.lastname
    },
    getPeopleById () {
      return this.$store.getters.getPeopleById(this.id)
    },
    getPeopleOrgSimilar () {
      return this.$store.getters.getPeopleOrgSimilar(this.id)
    },
    getPeopleSchoolSimilar () {
      return this.$store.getters.getPeopleSchoolSimilar(this.id)
    },
    getOrgName () {
      return this.$store.getters.getOrgById(this.personData.occupation[0].organization)
    }
  },
  watch: {
    $route () {
      this.reload()
    },
    getPeopleById () {
      this.personData = this.getPeopleById[0]
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
      if (!this.personData.birthday) return 'ไม่มีข้อมูล'
      if (this.personData.birthday === '') return 'ไม่มีข้อมูล'
      let value = this.personData.birthday.replace(/-/g, '')
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
.image {
  width: 100%;
  min-width: 100%;
  height: 270px;
  max-height: 270px;
}
.image-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
figure.image {
  margin: 0 !important;
}
</style>
