<template>
  <div class="w-100">
    <form @submit.prevent="request">
      <div class="form-group required">
        <label for="userpassword">Email*</label>
        <input v-model="email" type="email" class="form-control" />
        <span v-if="$v.email.$error" class="text-danger"
          >Please enter a valid email address</span
        >
      </div>

      <div class="my-5">
        <button
          :disabled="isSubmitting"
          type="submit"
          class="btn btn-block btn-primary"
        >
          <b-spinner
            v-if="isSubmitting"
            type="grow"
            small
            class="mr-2"
          ></b-spinner>
          <span v-if="!isSubmitting">Request Password Reset</span>
          <!-- <i class="fa fa-arrow-right"></i> -->
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";
export default {
  name: "Request-pw-form",
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      isSubmitting: false
    };
  },
  validations: {
    email: { required, email }
  },
  methods: {
    async request() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.isSubmitting = true;
      try {
        await this.$axios.post("/auth/forgot_password", { email: this.email });
        this.isSubmitting = false;
        this.$bvToast.toast(
          "Request sent successfully.Please check your email for the password reset link.",
          {
            title: "Success Request",
            variant: "success"
          }
        );
      } catch (error) {
        this.isSubmitting = false;

        console.log(error);
        this.$bvToast.toast("Please check your network or refresh this page.", {
          title: "Network Error",
          variant: "danger"
        });
      }
    }
  }
};
</script>

<style></style>
