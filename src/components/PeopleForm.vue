<template>
  <form ref="formInput" @submit.prevent="save" v-if="people">
    <div class="columns">
      <div class="column is-3 column-p has-border">
        <div class="field">
          <div class="control">
            <a class="button is-success" @click="openModal" title="อัพโหลดรูปภาพ">
              เลือกรูปภาพ
            </a>
          </div>
        </div>
        <div class="field">
          <label class="label">ชื่อจริง</label>
          <div class="control">
            <input class="input" type="text" v-model="people.firstname">
          </div>
        </div>
        <div class="field">
          <label class="label">นามสกุล</label>
          <div class="control">
            <input class="input" type="text" v-model="people.lastname">
          </div>
        </div>
        <div class="field">
          <label class="label">อีเมล์</label>
          <div class="control">
            <input class="input" type="text" v-model="people.email">
          </div>
        </div>
        <div class="field">
          <label class="label">เบอร์โทร</label>
          <div class="control">
            <input class="input" type="text" v-model="people.tel">
          </div>
        </div>
        <div class="field">
          <label class="label">เพศ</label>
          <div class="control">
            <label class="radio">
              <input type="radio" name="gender" value="ชาย" v-model="people.gender">
              ชาย
            </label>
            <label class="radio">
              <input type="radio" name="gender" value="หญิง" v-model="people.gender">
              หญิง
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label">สถานภาพ</label>
          <div class="control">
            <label class="radio">
              <input type="radio" name="status" value="โสด" v-model="people.status">
              โสด
            </label>
            <label class="radio">
              <input type="radio" name="status" value="แต่งงาน" v-model="people.status">
              แต่งงาน
            </label>
            <label class="radio">
              <input type="radio" name="status" value="หย่าร้าง" v-model="people.status">
              หย่าร้าง
            </label>
          </div>
        </div>
      </div>
      <div class="column column-p has-border">
        <div class="columns">
          <div class="column is-3">
            <div class="field">
              <label class="label">วันเกิด</label>
              <div class="control">
                <input type="date" class="input" v-model="people.birthday">
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">กลุ่มเลือด</label>
              <div class="control">
                <div class="select">
                  <select v-model="people.blood">
                    <option value="">Select dropdown</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">ศาสนา</label>
              <div class="control">
                <div class="select">
                  <select v-model="people.religion">
                    <option value="">Select dropdown</option>
                    <option value="ศาสนาพุทธ">ศาสนาพุทธ</option>
                    <option value="ศาสนาอิสลาม">ศาสนาอิสลาม</option>
                    <option value="ศาสนาคริสต์">ศาสนาคริสต์</option>
                    <option value="ศาสนาฮินดู">ศาสนาฮินดู</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">ที่อยู่</label>
              <div class="control">
                <input type="text" class="input" placeholder="ที่อยู่" v-model="people.address.address">
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <input type="text" class="input" placeholder="ตำบล" v-model="people.address.subDistrict">
              </div>
              <div class="control">
                <input type="text" class="input" placeholder="อำเภอ" v-model="people.address.district">
              </div>
              <div class="control">
                <input type="text" class="input" placeholder="จังหวัด" v-model="people.address.province">
              </div>
              <div class="control">
                <input type="text" class="input" placeholder="รหัสไปรษณีย์" v-model="people.address.zipcode">
              </div>
            </div>
          </div>
        </div>
        <label class="label">การศึกษา</label>
        <div class="field is-grouped is-grouped-multiline" v-for="(school, i) in people.schools" :key="`school-${i}`">
          <div class="control">
            <input class="input" type="text" placeholder="ชื่อสถานศึกษา" v-model="people.schools[i].school">
          </div>
          <div class="control">
            <input class="input" type="text" placeholder="ระดับการศึกษา" v-model="people.schools[i].level">
          </div>
          <div class="control">
            <input class="input" type="text" placeholder="สาขาวิชา" v-model="people.schools[i].faculty">
          </div>
          <div class="control">
            <input class="input" type="text" placeholder="ปีการศึกษา" v-model="people.schools[i].year">
          </div>
          <div class="control">
            <input class="button is-success" type="button" value="+"
              @click="addItems(people.schools, { school: '', level: '', faculty: '', year: '' })">&nbsp;
            <input class="button is-danger" type="button" value="-" @click="delItems(people.schools, i)">
          </div>
        </div>
        <label class="label">องค์กร / อาชีพ</label>
        <div class="field is-grouped is-grouped-multiline">
          <div class="control">
            <input class="input" type="text" placeholder="อาชีพ" v-model="people.organizationsPrimary.job">
          </div>
          <div class="control">
            <div class="select">
              <select v-model="people.organizationsPrimary.organization">
                <option value="">เลือกองค์กร</option>
                <option :value="org._id" v-for="(org, op) in getOrgs" :key="`oc-${op}`">{{ org.nameTH }}</option>
              </select>
            </div>
          </div>
          <div class="control">
            <input class="input" type="text" placeholder="ตำแหน่ง" v-model="people.organizationsPrimary.position">
          </div>
          <div class="control">
            <input class="input" type="text" placeholder="เงินเดือน" v-model="people.organizationsPrimary.salary">
          </div>
        </div>
        <hr>
        <div class="field is-grouped is-grouped-multiline" v-for="(org, i) in people.organizations" :key="`org-${i}`">
          <div class="control">
            <input class="input" type="text" placeholder="อาชีพ" v-model="people.organizations[i].job">
          </div>
          <div class="control">
            <div class="select">
              <select v-model="people.organizations[i].organization">
                <option value="">เลือกองค์กร</option>
                <option :value="org._id" v-for="(org, oc) in getOrgs" :key="`oc-${oc}`">{{ org.nameTH }}</option>
              </select>
            </div>
          </div>
          <div class="control">
            <input class="input" type="text" placeholder="ตำแหน่ง" v-model="people.organizations[i].position">
          </div>
          <div class="control">
            <input class="input" type="text" placeholder="เงินเดือน" v-model="people.organizations[i].salary">
          </div>
          <div class="control">
            <input class="button is-success" type="button" value="+"
              @click="addItems(people.organizations, { job: '', organization: '', position: '', salary: 0 })">&nbsp;
            <input class="button is-danger" type="button" value="-" @click="delItems(people.organizations, i)">
          </div>
        </div>
        <label class="label">บัญชีโซเชี่ยล </label>
        <div class="field is-grouped" v-for="(social, i) in people.socials" :key="`social-${i}`">
          <div class="control">
            <input class="input" type="text" placeholder="ชื่อบัญชี" v-model="people.socials[i].account">
          </div>
          <div class="control">
            <div class="select">
              <select v-model="people.socials[i].host">
                <option value="">ประเภทบัญชี</option>
                <option value="facebook">facebook</option>
                <option value="twitter">twitter</option>
                <option value="instagram">instagram</option>
              </select>
            </div>
          </div>
          <div class="control">
            <input class="button is-success" type="button" value="+"
              @click="addItems(people.socials, { account: '', type: '' })">&nbsp;
            <input class="button is-danger" type="button" value="-" @click="delItems(people.socials, i)">
          </div>
        </div>
      </div>
    </div>
    <upload-modal :value="modal" :image="file" :percent="progress"
      @close="closeModal" @selectedFile="selectedFile" @uploadPhoto="uploadPhoto">
    </upload-modal>
    <div class="field is-grouped">
      <div class="control">
        <input class="button is-link" type="submit" value="save">
      </div>
      <div class="control">
        <a class="button is-text" @click="back">cancel</a>
      </div>
    </div>
  </form>
</template>

<script>
import { PeopleData } from '@/mixins'
import { Upload } from '@/services'
import Icon from '@/components/Icon'
import UploadModal from '@/components/UploadModal'

export default {
  props: ['data'],
  mixins: [PeopleData],
  components: {
    Icon,
    UploadModal
  },
  data: () => ({
    modal: false,
    file: null,
    progress: 0
  }),
  created () {
    this.reload()
  },
  computed: {
    getOrgs () {
      return this.$store.getters.getOrgs
    }
  },
  watch: {
    data () {
      this.reload()
    }
  },
  methods: {
    reload () {
      if (!this.data) return
      this.people = this.data
    },
    save () {
      this.$emit('save', this.people)
    },
    addItems (t, v) {
      t.push(v)
    },
    delItems (t, n) {
      if (t.length > 1) {
        t.splice(n, 1)
      } else {
        return false
      }
    },
    openModal () {
      this.modal = true
    },
    selectedFile (file) {
      this.file = file
    },
    uploadPhoto () {
      if (!this.file) return
      Upload.uploadPhoto(this.file,
        (progress) => {
          this.progress = progress
        },
        (downloadURL) => {
          this.people.photo = downloadURL
          this.closeModal(false)
        })
    },
    closeModal (value) {
      this.modal = value
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>
