<template>
  <div class="w-100">
    <form @submit.prevent="register">
      <div class="form-group required">
        <label for="useremeail">Email addresss*</label>
        <input
          v-model="$v.email.$model"
          :class="{ invalid: $v.email.$error }"
          type="email"
          class="form-control p-4"
          placeholder="example@gmail.com"
          id="useremeail"
        />
        <span v-if="$v.email.$error" class="text-danger error-feedback"
          >Please enter a valid email</span
        >
      </div>
      <div class="form-group required">
        <label for="useremeail">First Name*</label>
        <input
          v-model="$v.first_name.$model"
          :class="{ invalid: $v.first_name.$error }"
          type="text"
          class="form-control p-4"
          placeholder="Alex"
          id="firstname"
        />
        <span v-if="$v.first_name.$error" class="text-danger error-feedback"
          >First name can't be empty</span
        >
      </div>
      <div class="form-group required">
        <label for="useremeail">Last Name*</label>
        <input
          v-model="$v.last_name.$model"
          :class="{ invalid: $v.last_name.$error }"
          type="text"
          class="form-control p-4"
          placeholder="J."
          id="lastname"
        />
        <span v-if="$v.first_name.$error" class="text-danger error-feedback"
          >First name can't be empty</span
        >
      </div>
      <div class="form-group required">
        <label for="userpassword">Password*</label>
        <input
          v-model="$v.password.$model"
          type="password"
          class="form-control p-4"
          :class="{ invalid: $v.password.$error }"
          placeholder="Enter password"
          id="userpassword"
        />
        <span v-if="$v.password.$error" class="text-danger error-feedback"
          >Password should not be less than 5 characters or more than 8
          characters</span
        >
      </div>
      <!-- <pre>{{$v}}</pre> -->
      <div class="form-group required">
        <label for="userpassword">Confirm password*</label>
        <input
          v-model="$v.confirmPassword.$model"
          type="password"
          class="form-control p-4"
          :class="{ invalid: $v.confirmPassword.$error }"
          placeholder="Confirm password"
          id="confirmuserpassword"
        />
        <span
          v-if="$v.confirmPassword.$error"
          class="text-danger error-feedback"
          >Passowrds do not match</span
        >
      </div>
      <!-- <div class="input-group d-flex align-items-center">
        <input
          v-model="sendNewsLetter"
          type="checkbox"
          id="newletter"
          aria-label="Checkbox for following text input"
        />
        <label for="newletter" class="ml-2">Send me DIA newsletter</label>
      </div> -->
      <AlertMsg ref="alertMsg" :variant="msgType" :message="signUpMessage" />
      <div class="mt-4">
        <button
          :disabled="isSubmitting"
          @click="register"
          type="submit"
          class="btn btn-block btn-primary"
        >
          <b-spinner
            v-if="isSubmitting"
            type="grow"
            small
            class="mr-2"
          ></b-spinner>
          <span v-if="!isSubmitting">Sign up</span>
        </button>
      </div>

      <div class="my-3">
        <p>
          By clicking sign up, I accept the
          <nuxt-link class="text-primary" to="/"
            >Terms and Conditions</nuxt-link
          >
          and
          <nuxt-link class="text-primary" to="/">Privacy Policy</nuxt-link>
        </p>
      </div>
      <div class="mt-4">
        <router-link
          to="/auth/login"
          class="btn pt-2 btn-block btn-outline-dark"
        >
          Already have an account? Log in
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  minLength,
  email,
  maxLength,
  required,
  sameAs
} from "vuelidate/lib/validators";
export default {
  name: "Signin-form",
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
      last_name: "",
      first_name: "",
      confirmPassword: "",
      sendNewsLetter: false,
      isSubmitting: false,
      signUpMessage: "",
      msgType: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
      // minLength: minLength(4),
      // maxLength: maxLength(8)
    },
    first_name: {
      required,
      minLength: minLength(2)
    },
    last_name: {
      required,
      minLength: minLength(2)
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
    }
  },
  methods: {
    async register() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        // this.showMessage('danger', 'Invalid input')
        return;
      }
      this.isSubmitting = true;
      try {
        const response = await this.$axios.$post("/auth/register", {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          password: this.password,
          password_confirmation: this.confirmPassword
        });
        const { access_token, token_type, email } = response;

        this.isSubmitting = false;
        this.signUpMessage = "Account created successfully";
        this.msgType = "success";
        this.$refs.alertMsg.showAlert();
        await this.$store.dispatch("login", {
          email,
          password: this.$v.password.$model
        });
        this.$router.push("/community");
      } catch (error) {
        this.signUpMessage = "Sorry try again";
        this.isSubmitting = false;
        this.msgType = "danger";
        this.$refs.alertMsg.showAlert();
      }
    }
  }
};
</script>

<style scoped>
form {
  margin-bottom: 40px;
}
.btn.btn-block.btn-primary,
.btn-outline-dark {
  height: 48px;
}
.form-group input[type="text"].form-control {
  border: 1px solid #d9d9d9;
}
.form-group.required input.invalid {
  border: 1px solid salmon;
}
.error-feedback {
  font-size: 12px;
}
</style>