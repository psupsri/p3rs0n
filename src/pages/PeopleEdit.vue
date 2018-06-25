<template>
<div>
  <p class="title">แก้ไขข้อมูลบุคคล</p>
  <people-form @save="save" :data="person" @back="back"></people-form>
</div>
</template>

<script>
import { PersonData } from '@/mixins'
import { People } from '@/services'
import peopleForm from '@/components/PeopleForm'

export default {
  mixins: [PersonData],
  data: () => ({
    id: null
  }),
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
        this.person = data
      })
    },
    save (value) {
      value._updatedAt = Date.now()
      People.update(this.id, value)
        .then(() => {
          this.$router.push(`/people/id/${this.id}`)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    back () {
      this.$router.push(`/people/id/${this.id}`)
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
