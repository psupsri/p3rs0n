<template>
  <div class="control">
    <label class="label" v-if="label">{{ label }}</label>
    <label class="radio" v-for="(item, i) in items" :key="i">
      <input type="radio" :name="name"  :value="item.value" @click="select(name, $event.target.value)">
      {{ item.text }}
    </label>
  </div>
</template>

<script>
export default {
  props: ['label', 'name', 'items'],
  methods: {
    select (name, value) {
      this.$emit('select', {
        name: name,
        value: value
      })
    }
  }
}
</script>
