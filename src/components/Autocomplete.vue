<template>
<div class="control is-expanded autocomplete">
  <label class="label" v-if="label">{{ label }}</label>
  <input class="input" type="text" :placeholder="placeholder"
    @input="inputValue($event.target.value)" :value="value">
  <ul class="autocomplete-results" v-if="isOpen">
    <li class="autocomplete-result" v-for="(result, i) in results" :key="i"
      @click="setValue(result.split(' ').pop())">
      {{ filterResult(result) }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['label', 'placeholder', 'items'],
  data: () => ({
    value: '',
    results: [],
    isOpen: false
  }),
  methods: {
    inputValue (value) {
      if (value === '' || value === ' ') {
        this.isOpen = false
        this.results = []
        return
      }
      this.isOpen = true
      this.results = this.items.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) > -1)
    },
    filterResult (value) {
      var v = value
      var s = v.split(' ')
      s.splice(-1, 1)
      return s.join(' ')
    },
    setValue (value) {
      this.value = value
      this.$emit('setClosePerson', value)
    }
  }
}
</script>

<style scoped>
  .autocomplete {
    position: relative;
    width: 130px;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>
