<template>
  <b-alert
    fade
    :show="dismissCountDown"
    dismissible
    :variant="variant"
    @dismissed="dismissCountDown = 0"
    @dismiss-count-down="countDownChanged"
  >
    {{message}}
  </b-alert>
</template>

<script>
export default {
  props:{
    message:{
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'success'
    }
  },
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style></style>
