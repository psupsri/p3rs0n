<template>
<div class="control" :class="controlOption">
  <label class="label" v-if="label">{{ label }}</label>
  <input class="input" :type="type" :placeholder="placeholder" :value="value" @input="inputValue($event.target.value)">
</div>
</template>

<script>
export default {
  props: ['type', 'label', 'placeholder', 'value', 'controlOption'],
  methods: {
    inputValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
