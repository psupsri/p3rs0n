<template>
  <figure class="image"
    :style="{ 'background-image': 'url(' + photo + ')', 'height': height + 'px' }">
    <!-- <img :src="photo" class="avatar" v-if="photo">
    <img src="@/assets/files/photos/nophoto.png" class="avatar" v-else> -->
  </figure>
</template>

<script>
export default {
  props: {
    photo: {
      type: String
    },
    height: {
      type: Number,
      default: 180
    }
  }
}
</script>

<style scoped>
.image {
  width: 100% !important;
  min-width: 100% !important;
  max-height: 180px !important;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
