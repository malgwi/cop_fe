<template>
  <div class="w-100">
    <form @submit.prevent="sendPasswordReset">
      <div class="form-group required">
        <label for="userpassword">Enter Password*</label>
        <input v-model="password" type="password" class="form-control" />
        <span v-if="$v.password.$error" class="text-danger error-feedback"
          >Password should not be less than five(5) characters</span
        >
      </div>
      <div class="form-group required">
        <label for="userpassword">Confirm new password</label>
        <input
          v-model="confirm_password"
          type="password"
          class="form-control"
        />
        <span
          v-if="$v.confirm_password.$error"
          class="text-danger error-feedback"
          >Passwords do not match</span
        >
      </div>
      <!-- Passowrd:{{ $v.password.$error }} Passowrd2:{{
        $v.confirm_password.$anyError
      }} -->
      <div class="my-5">
        <button type="submit" class="btn btn-block btn-primary">
          <b-spinner
            v-if="isSubmitting"
            type="grow"
            small
            class="mr-2"
          ></b-spinner>
          Reset Password
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { sameAs, required } from "vuelidate/lib/validators";
export default {
  name: "password-reset-form",
  mixins: [validationMixin],
  data() {
    return {
      password: "",
      confirm_password: "",
      token: "",
      email: "",
      isSubmitting: false,
    };
  },
  validations: {
    password: { required },
    confirm_password: { required, sameAs: sameAs("password") }
  },
  methods: {
    async sendPasswordReset() {      
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.isSubmitting = true;
      try {
        await this.$axios.post("/auth/reset_password", {
          email: this.email,
          token: this.token,
          password: this.password,
          password_confirmation: this.confirm_password,
        });
        this.isSubmitting= false
        this.$bvToast.toast("Password reset was successful.", {
          title: "Password Reset",
          variant: "success"
        });
        setTimeout(()=> {
          this.$router.push('/auth/login')
        }, 4000)
      } catch (error) {
        let errorMsg
        this.isSubmitting= false
        if(error.response?.data?.message){
          errorMsg = error.response.data.message                 
        } else{
          errorMsg = Object.entries(error.response?.data?.error).map(err=> err[1][0]).join(",")
        }        
        this.isSubmitting = false;
        this.$bvToast.toast(
          errorMsg,
          {
            title: "Password Reset",
            variant: "danger"
          }
        );
      }
    }
  },
  mounted() {
    // this.$router.push(
    //   "/reset-password?token=1c2640d10f2cbe54079190b38dc75f11131e19373392dc9449bf7a4fd39aec8c&email=peter.o.olu@gmail.com"
    // );
    setTimeout(() => {
      this.token = this.$route.query.token;
      this.email = this.$route.query.email;
      //   console.log(
      //     "Token",
      //     this.$route.query.token,
      //     "email",
      //     this.$route.query.email
      //   );
    }, 1000);
  }
};
</script>

<style>
.form-group.required input.invalid {
  border: 1px solid salmon;
}
.error-feedback {
  font-size: 12px;
}
</style>
