<template>
  <div>
    <p class="title">เพิ่มข้อมูลองค์กร</p>
    <organization-form @save="save" @back="back"></organization-form>
  </div>
</template>

<script>
import { Organization } from '@/services'

import OrganizationForm from '@/components/OrganizationForm'

export default {
  components: {
    OrganizationForm
  },
  methods: {
    save (data) {
      data._createdAt = Date.now()
      data._updatedAt = Date.now()
      Organization.set(data)
        .then(() => {
          this.$router.push('/organization')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    back () {
      this.$router.push('/organization')
    }
  }
}
</script>
