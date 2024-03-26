<template>
  <div
    class="position-absolute loader w-100 d-flex justify-content-center align-items-center"
  >
    <b-spinner
      :style="`width: ${size}rem; height: ${size}rem;  opacity:${opacity};`"
      label="Large Spinner"  
      small
    ></b-spinner>
  </div>
</template>

<script>
export default {
  props:{
    spinType:{
      type: String,
      default: '',
    },
    size:{
      type: String,
      default: '',
    },
    opacity:{
      type: String,
      default: '',
    },
    color:{
      type: String,
      default: '',
    }
  },
};
</script>

<style scoped>
.loader{
  z-index: 1000;
  background: rgb(248, 246, 246);
  height: 349px;
}
</style>
