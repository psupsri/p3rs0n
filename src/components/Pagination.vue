<template>
  <nav class="pagination">
    <button class="pagination-previous button" @click="prevPage" :disabled="pageNumber === 1">Previous</button>
    <button class="pagination-next button" @click="nextPage" :disabled="pageNumber === totalPage">Next page</button>
    <ul class="pagination-list">
      <li v-for="(p, i) in totalPage" :key="i" @click="selectPage(p)">
        <button class="pagination-link button" :class="{'is-current': pageNumber === p}">{{ p }}</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    listData: { type: Array, required: true },
    size: { type: Number, required: false, default: 10 }
  },
  data: () => ({
    pageNumber: 1
  }),
  watch: {
    pageNumber () {
      this.$emit('changePage', this.pageNumber)
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.listData.length / this.size)
    }
  },
  methods: {
    nextPage () {
      this.pageNumber++
    },
    prevPage () {
      this.pageNumber--
    },
    selectPage (page) {
      this.pageNumber = page
    }
  }
}
</script>
