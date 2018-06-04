<template>
  <span class="icon" :class="color">
    <i class="fa" :class="icon"></i>
  </span>
</template>

<script>
export default {
  props: ['color', 'icon']
}
</script>
