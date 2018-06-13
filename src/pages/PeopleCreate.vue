<template>
<div>
  <p class="title">เพิ่มข้อมูลบุคคล</p>
  <people-form @save="save"></people-form>
</div>
</template>

<script>
import { People } from '@/services'
import peopleForm from '@/components/PeopleForm'

export default {
  components: {
    peopleForm
  },
  methods: {
    save (value) {
      value._createdAt = Date.now()
      value._updatedAt = Date.now()
      People.set(value)
        .then(() => {
          this.$router.push('/people')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    back () {
      this.$router.push(`/people`)
    },
    toLower (value) {
      if (!value) return
      return value.toLowerCase()
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
