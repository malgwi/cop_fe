<template>
  <div class="w-100 sign-up__wrap bg-secondary">
    <div class="container min-vh-100 ">
      <div class="row">
        <div class="col-12">
          <div class="mt-5"></div>
          <div
            class="welcom-msg d-flex align-items-center justify-content-center flex-column"
          >
            <h1 class="text-center welcome">
              Welcome to the National AMR/AMU Community of Practice
            </h1>
            <p class="text-center">
              Thank you for coming back
            </p>
          </div>
          <div class="mt-5"></div>
          <div class="d-flex justify-content-center">
            <div class="form-wrap bg-white rounded p-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Sponsors />
  </div>
</template>

<script>
export default {
  name: "Signin",
  layout: "user",
  middleware: "guest-auth"
};
</script>

<style scoped>
h1.welcome {
  font-size: 1.5rem;
}
.sign-up__wrap {
  height: 100vh;
}
.welcom-msg p,
.welcom-msg h1 {
  max-width: 444px;
}
.form-wrap {
  width: 500px;
}
</style>
