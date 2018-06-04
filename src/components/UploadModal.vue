<template>
  <div class="modal" :class="{ 'is-active': modal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Upload Image</p>
        <div class="delete" aria-label="close" @click="close"></div>
      </header>
      <section class="modal-card-body">
        <img :src="file" v-if="file">
        <progress class="progress is-link" :value="progress" max="100" v-if="file"></progress>
        <div class="field is-grouped">
          <div class="control">
            <div class="file is-link">
              <label class="file-label">
                <input class="file-input" type="file" ref="file" @change="selectedFile">
                <span class="file-cta">
                  <span class="file-icon is-hidden-mobile">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div class="control" v-if="file">
            <div class="button is-warning" @click="uploadFile">Upload</div>
          </div>
          <div class="control">
            <div class="button" @click="close">Cancel</div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'image', 'percent'],
  data: () => ({
    modal: false,
    file: null,
    progress: 0
  }),
  created () {
    this.modal = this.value
  },
  watch: {
    value () {
      this.modal = this.value
    },
    image () {
      this.file = this.image
    },
    percent () {
      this.progress = this.percent
    }
  },
  methods: {
    open () {
      this.modal = true
    },
    close () {
      this.$emit('close', false)
    },
    selectedFile (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(this.$refs.file.files[0])
      this.$emit('selectedFile', this.$refs.file.files[0])
    },
    uploadFile () {
      this.$emit('uploadPhoto')
    },
    createImage (file) {
      let reader = new FileReader()
      let vm = this
      reader.onload = (e) => {
        vm.file = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
