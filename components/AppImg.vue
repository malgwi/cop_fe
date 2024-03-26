<template>
  <img class="img-fluid" :src="imgSrc" alt="" />
</template>

<script>
export default {
  name: "AppImg",
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
