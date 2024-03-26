<template>
  <div class="w-100">
    <form @submit.prevent="login">
      <div class="form-group required">
        <label for="email">Email</label>
        <input
          v-model="$v.email.$model"
          :class="{ invalid: $v.email.$error }"
          type="email"
          class="form-control"
          id="username"
          aria-describedby="emailHelp"
        />
        <span v-if="$v.email.$error" class="text-danger error-feedback"
          >Please enter a valid email</span
        >
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>
      <div class="form-group required">
        <label for="userpassword">Password</label>
        <input
          v-model="$v.password.$model"
          :class="{ invalid: $v.password.$error }"
          type="password"
          class="form-control"
          id="userpassword"
        />
        <span v-if="$v.password.$error" class="text-danger error-feedback"
          >Password should not be less than five(5) characters</span
        >
      </div>
      <AlertMsg ref="alertMsg" :variant="msgType" :message="signUpMessage" />
      <div class="mt-4">
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
          <span v-if="!isSubmitting">Login</span>
          <!-- <i class="fa fa-arrow-right"></i> -->
        </button>
      </div>

      <p class="text-center my-4">
        <nuxt-link
          :disabled="isSubmitting"
          class="text-muted"
          to="/auth/forgot-password"
          >Forgot Password?</nuxt-link
        >
      </p>

      <div class="mt-4">
        <router-link to="/auth/register" class="btn btn-block btn-outline-dark">
          Sign Up
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";
export default {
  name: "login-form",
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
      isSubmitting: false,
      signUpMessage: "",
      msgType: ""
    };
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.isSubmitting = true;
      try {
        const userDetails = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        this.isSubmitting = false;
        this.signUpMessage = "Welcome back";
        setTimeout(() => {
          if (this.$auth.user?.account_type === "admin")
            return this.$router.push("/admin/dashboard");
          this.$router.push("/community");
        }, 500);
      } catch (error) {
        let errorMsg
        if(error.response.status === 401){
          errorMsg  = error.response?.data?.message
        }
        this.$bvToast.toast(errorMsg, {
          title: "Error",
          variant: "danger"
        });
        if (error == "User Data response does not contain field user") {
          return this.$router.push("/community");
        }
        this.isSubmitting = false;
      } finally {
      }
    }
  },
  async logout({ commit }) {
    commit("LOGOUT");
  }
};
</script>

<style scoped>
.form-group.required input.invalid {
  border: 1px solid salmon;
}
.error-feedback {
  font-size: 12px;
}
</style>
