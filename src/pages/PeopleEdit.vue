<template>
<div class="box">
  <p class="title">แก้ไขข้อมูลบุคคล</p>
  <people-form @save="save" :data="people"></people-form>
</div>
</template>

<script>
import { PeopleData } from '@/mixins'
import { People } from '@/services'
import peopleForm from '@/components/PeopleForm'

export default {
  mixins: [PeopleData],
  components: {
    peopleForm
  },
  created () {
    this.reload()
    this.getById()
  },
  watch: {
    $route () {
      this.reload()
    }
  },
  methods: {
    reload () {
      this.id = this.$route.params.id
    },
    getById () {
      People.getById(this.id, (data) => {
        this.people = data
      })
    },
    save (value) {
      value._updatedAt = Date.now()
      People.update(this.id, value)
        .then(() => {
          this.$router.push('/people')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.column-p {
  margin: 0.5rem;
}
.has-border {
  border: 1px solid #dbdbdb;
}
</style>
