<template>
  <form ref="formInput" @submit.prevent="save" v-if="person">
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
          <input-box :type="`text`" :label="`ชื่อ`" v-model="person.firstname"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`นามสกุล`" v-model="person.lastname"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`อีเมล์`" v-model="person.email"></input-box>
        </div>
        <div class="field">
          <input-box :type="`text`" :label="`โทร`" v-model="person.tel"></input-box>
        </div>
        <div class="field">
          <input-radio :label="`เพศ`" :name="`gender`"
            :items="[
              { value: 'ชาย', text: 'ชาย' },
              { value: 'หญิง', text: 'หญิง' }
            ]"
            @select="select"
          ></input-radio>
        </div>
        <div class="field">
          <input-radio :label="`สถานภาพ`" :name="`status`"
            :items="[
              { value: 'โสด', text: 'โสด' },
              { value: 'แต่งงาน', text: 'แต่งงาน' },
              { value: 'หย่าร้าง', text: 'หย่าร้าง' }
            ]"
            @select="select"
          ></input-radio>
        </div>
      </div>
      <div class="column column-p has-border">
        <div class="columns">
          <div class="column is-3">
            <div class="field">
              <input-box :type="`date`" :label="`วันเกิด`" v-model="person.birthday"></input-box>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <input-select :label="`กลุ่มเลือด`" :name="`blood`"
                :items="bloodChoice" @select="select">
              </input-select>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <input-select :label="`ศาสนา`" :name="`religion`"
                :items="religionChoice" @select="select"></input-select>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <input-box :type="`text`" :label="`ที่อยู่`" :placeholder="`ที่อยู่`" v-model="person.address.adress"></input-box>
            </div>
            <div class="field is-grouped">
              <input-box :type="`text`" :placeholder="`ที่อยู่`" v-model="person.address.tambon"></input-box>
              <input-box :type="`text`" :placeholder="`ที่อยู่`" v-model="person.address.amphoe"></input-box>
              <input-box :type="`text`" :placeholder="`ที่อยู่`" v-model="person.address.province"></input-box>
              <input-box :type="`text`" :placeholder="`ที่อยู่`" v-model="person.address.postcode"></input-box>
            </div>
          </div>
        </div>
        <label class="label">ความสัมพันธ์พิเศษ</label>
        <div class="field is-grouped is-grouped-multiline" v-for="(cr, ci) in person.closeRelation" :key="`cr${ci}`">
          <!-- <input-box :type="`text`" v-model="person.closeRelation.person"></input-box> -->
          <div class="control">
            <input :list="`browsers-` + ci" class="input"
              @change="setClosePerson($event.target.value, ci)">
            <datalist :id="`browsers-` + ci">
              <option :value="gp.fullname" v-for="(gp, gpi) in getPeople"
                :key="gpi">{{ gp._id }}</option>
            </datalist>
          </div>
          <div class="control">
            <div class="select">
              <select v-model="person.closeRelation[ci].relation">
              <option value="">เลือกความสัมพันธ์</option>
              <option v-for="(rc, rci) in relationChoice" :key="`rc-${rci}`" :value="rc">{{ rc }}</option>
            </select>
          </div>
          </div>
          <p class="control">
            <a class="button is-success"
              @click="addItems(person.closeRelation, { person: '', relation: ''})">
              add
            </a>
          </p>
          <p class="control">
            <a class="button is-danger" @click="delItems(person.closeRelation, ci)">
              del
            </a>
          </p>
        </div>
        <label class="label">การศึกษา</label>
        <div class="field is-grouped is-grouped-multiline" v-for="(edu, ei) in person.education" :key="`edu${ei}`">
          <input-box :type="`text`" :placeholder="`ระดับ`" v-model="person.education[ei].level"></input-box>
          <input-box :type="`text`" :placeholder="`สาขาวิชา`" v-model="person.education[ei].faculty"></input-box>
          <input-box :type="`text`" :placeholder="`สถานศึกษา`" v-model="person.education[ei].school"></input-box>
          <p class="control">
            <a class="button is-success"
              @click="addItems(person.education, { level: '', faculty: '', school: '' })">
              add
            </a>
          </p>
          <p class="control">
            <a class="button is-danger" @click="delItems(person.education, ei)">
              del
            </a>
          </p>
        </div>
        <label class="label">องค์กร / อาชีพ</label>
        <div class="field is-grouped is-grouped-multiline" v-for="(oc, oi) in person.occupation" :key="`oc${oi}`">
          <input-box :type="`text`" :placeholder="`อาชีพ`" v-model="person.occupation[oi].job"></input-box>
          <input-box :type="`text`" :placeholder="`ตำแหน่ง`" v-model="person.occupation[oi].position"></input-box>
          <div class="control">
            <div class="select">
              <select v-model="person.occupation[oi].organization">
                <option value="">กรุณาเลือก</option>
                <option v-for="(item, i) in getOrgs" :key="i" :value="item._id">
                  {{ item.nameTH }}
                </option>
              </select>
            </div>
          </div>
          <input-box :type="`text`" :placeholder="`เงินเดือน`" v-model="person.occupation[oi].salary"></input-box>
          <p class="control">
            <a class="button is-success"
              @click="addItems(person.occupation, { job: '', position: '', organization: '', salary: '' })">
              add
            </a>
          </p>
          <p class="control">
            <a class="button is-danger" @click="delItems(person.occupation, oi)">
              del
            </a>
          </p>
        </div>
        <label class="label">บัญชีโซเชี่ยล </label>
        <div class="field is-grouped is-grouped-multiline" v-for="(so, si) in person.social" :key="`so${si}`">
          <input-box :type="`text`" :placeholder="`ระดับ`" v-model="person.social[si].account"></input-box>
          <div class="control">
            <div class="select">
              <select v-model="person.social[si].host">
                <option value="">กรุณาเลือก</option>
                <option v-for="(item, i) in socialChoice" :key="i" :value="item.value">
                  {{ item.text }}
                </option>
              </select>
            </div>
          </div>
          <p class="control">
            <a class="button is-success"
              @click="addItems(person.social, { account: '', host: '' })">
              add
            </a>
          </p>
          <p class="control">
            <a class="button is-danger" @click="delItems(person.social, si)">
              del
            </a>
          </p>
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
import _ from 'lodash'
import { PersonData } from '@/mixins'
import { Upload } from '@/services'

import Icon from '@/components/Icon'
import InputBox from '@/components/InputBox'
import InputRadio from '@/components/InputRadio'
import InputSelect from '@/components/InputSelect'
import UploadModal from '@/components/UploadModal'
import Autocomplete from '@/components/Autocomplete'

export default {
  props: ['data'],
  mixins: [PersonData],
  components: {
    Icon,
    UploadModal,
    InputBox,
    InputRadio,
    InputSelect,
    Autocomplete
  },
  data: () => ({
    modal: false,
    file: null,
    progress: 0,
    orgs: [],
    bloodChoice: [
      { value: 'A', text: 'A' },
      { value: 'B', text: 'B' },
      { value: 'AB', text: 'AB' },
      { value: 'O', text: 'O' }
    ],
    religionChoice: [
      { value: 'ศาสนาพุทธ', text: 'ศาสนาพุทธ' },
      { value: 'ศาสนาอิสลาม', text: 'ศาสนาอิสลาม' },
      { value: 'ศาสนาคริสต์', text: 'ศาสนาคริสต์' },
      { value: 'ศาสนาฮินดู', text: 'ศาสนาฮินดู' }
    ],
    addressGroup: [
      { type: 'text', placeholder: 'ตำบล' },
      { type: 'text', placeholder: 'อำเภอ' },
      { type: 'text', placeholder: 'จังหวัด' },
      { type: 'text', placeholder: 'รหัสไปรษณีย์' }
    ],
    educationGroup: [
      { type: 'text', placeholder: 'ชื่อสถานศึกษา' },
      { type: 'text', placeholder: 'ระดับการศึกษา' },
      { type: 'text', placeholder: 'สาขาวิชา' },
      { type: 'text', placeholder: 'ปีการศึกษา' }
    ],
    occupationGroup: [
      { type: 'text', placeholder: 'occupation' }
    ],
    socialChoice: [
      { value: 'facebook', text: 'facebook' },
      { value: 'twitter', text: 'twitter' },
      { value: 'instagram', text: 'instagram' }
    ],
    relationChoice: [
      'พ่อ', 'แม่', 'ลูก', 'พี่', 'น้อง'
    ]
  }),
  created () {
    this.reload()
  },
  watch: {
    data () {
      this.reload()
    }
  },
  computed: {
    getOrgs () {
      return this.$store.getters.getOrgs
    },
    getPeople () {
      return _.map(this.$store.getters.getPeople, (n) => {
        return {
          fullname: n.firstname + ' ' + n.lastname,
          _id: n._id
        }
      })
    }
  },
  methods: {
    select (value) {
      this.person[value.name] = value.value
    },
    reload () {
      if (!this.data) return
      this.person = this.data
    },
    save () {
      this.$emit('save', this.person)
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
          this.person.photo = downloadURL
          this.closeModal(false)
        })
    },
    closeModal (value) {
      this.modal = value
    },
    back () {
      this.$emit('back')
    },
    setClosePerson (value, index) {
      if (value.trim() === '') {
        this.person.closeRelation[index].relation = ''
        return
      }
      var x = _.filter(this.getPeople, { 'fullname': value })
      this.person.closeRelation[index].person = x[0]._id
    }
  }
}
</script>
