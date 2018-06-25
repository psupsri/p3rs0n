<template>
<div class="columns is-multiline">
  <div class="column is-12">
    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="title">ข้อมูลองค์กร</span><br>
      </div>
      <div class="column is-10">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="Find a repository">
          </div>
          <!-- <p class="control">
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
          </p> -->
          <div class="control">
            <button class="button is-info">
              ค้นหา
            </button>
          </div>
        </div>
      </div>
      <div class="column">
        <router-link to="new" append class="button is-info">
          Create New
        </router-link>
      </div>
    </div>
  </div>
  <div class="column">
    <!-- <search-input @search="getSearchResult"></search-input> -->
    <div class="columns is-multiline">
      <!-- <div class="column is-4" v-for="(org, i) in getOrgs" :key="i">
        <div class="card">
          <div class="card-content">
            <div class="columns">
              <div class="column is-5 org-head">
                <figure class="image">
                  <img class="org-logo" src="https://bulma.io/images/placeholders/1280x960.png">
                </figure>
              </div>
              <div class="column">
                <p class="title is-4">{{ org.nameShEN }}</p>
                <p class="title is-6">{{ org.nameShTH }}</p>
              </div>
            </div>
            {{ org.coordinator }}
          </div>
        </div>
      </div> -->
      <div class="column">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead class="thead">
            <tr>
              <th v-for="(h, hi) in [
                'ชื่อไทย','ชื่ออังกฤษ','ผู้ประสานงาน', 'เบอร์โทร', 'อีเมล์', 'พื้นที่ปฏิบัติงาน', 'วัตถุประสงค์'
              ]" :key="hi">{{ h }}</th>
            </tr>
          </thead>
          <tbody>
            <router-link :to="`/organization/id/${org._id}`" tag="tr" v-for="(org, i) in getOrgs" :key="i">
              <td v-for="(oh, ohi) in ['nameTH', 'nameEN', 'coordinator', 'tel', 'email', 'area', 'objective']" :key="ohi">{{ org[oh] }}</td>
            </router-link>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- <div class="column is-3">
    <div class="field">
      <div class="control is-expanded">
        <router-link to="new" append class="button is-info">
          Create New
        </router-link>
      </div>
    </div>
  </div> -->
</div>
</template>

<script>
import SearchInput from '@/components/Searchinput'

export default {
  components: {
    SearchInput
  },
  computed: {
    getOrgs () {
      return this.$store.getters.getOrgs
    }
  },
  methods: {
    getSearchResult () {
      console.log('eiei')
    }
  }
}
</script>

<style scoped>
.org-head > .image {
  margin: none;
  padding: none;
}
.org-logo {
  object-fit: cover;
}
.thead {
  background: #ffdd57;
}
</style>
