<template>
  <figure class="image">
    <img :src="photo" class="avatar" v-if="photo">
    <img src="@/assets/files/photos/nophoto.png" class="avatar" v-else>
  </figure>
</template>

<script>
export default {
  props: ['photo']
}
</script>

<style scoped>
.image {
  width: 100% !important;
  min-width: 100% !important;
  height: 180px !important;
  max-height: 180px !important;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
