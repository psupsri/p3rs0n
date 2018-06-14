<template>
  <div id="app">
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  background: #f9f9f9;
  overflow: hidden !important;
}
</style>

<style>
.box {
  box-shadow: none !important;
  height: 100%;
  padding: 2rem;
}
.card {
  box-shadow: none !important;
  border: 1px solid #e4e4e4;
}
</style>
