<template>
<div class="control">
  <label class="label" v-if="label">{{ label }}</label>
  <div class="select">
    <select @change="select(name, $event.target.value)">
      <option value="">กรุณาเลือก</option>
      <option v-for="(item, i) in items" :key="i" :value="item[vindex]">
        {{ item[tindex] }}
      </option>
    </select>
  </div>
</div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    name: { type: String },
    items: [ Array, Object ],
    tindex: {
      type: String,
      default: 'text'
    },
    vindex: {
      type: String,
      default: 'value'
    }
  },
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
