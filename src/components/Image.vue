<template>
  <img :src="url" class="img-fit" @error="imageUrlAlt">
</template>

<script>
export default {
  props: {
    url: String,
    errorurl: String
  },
  methods: {
    imageUrlAlt(event) {
      event.target.src = this.errorurl;
    }
  }
};
</script>

<style>
.img-fit {
  object-fit: contain;
  border-radius: 0 !important;
}
</style>

