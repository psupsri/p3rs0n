<template>
<div class="field is-grouped">
  <div class="control" v-for="(item, i) in items" :key="i">
    <input class="input" :type="item.type"
      :placeholder="item.placeholder" v-if="item.type === 'text'">
  </div>
</div>
</template>

<script>
export default {
  props: ['items']
}
</script>
