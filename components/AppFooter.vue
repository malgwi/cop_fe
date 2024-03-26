<template>
  <div class="app-footer bg-primary">
    <div class="container">
      <h1 class="text-center footer-header text-white">
        Subscribe to our Newsletter.
      </h1>
      <!-- <p class="text-center footer-para text-white">
        No Spam. Only interesting contents and updates!
      </p> -->
      <div class="d-flex justify-content-center py-5">
        <NewsLetterForm />
      </div>
      <hr class="h-rule" />
    </div>
    <div
      class="d-flex flex-column pb-2 align-items-center position-relative justify-content-center"
    >
      <FooterNav />
      <!-- <div class=" site-author text-white text-sm mt-2">
        Designed By
        <a
          class="text-white"
          href="https://kainamedia.com/"
          target="_blank"
          rel="noopener noreferrer"
          >Kaina Media</a
        >
      </div> -->
      <!-- <div class="ml-auto">Designed by</div> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.app-footer {
  padding-top: 90px;
  /* padding-bottom: 90px; */
}
.footer-header {
  /* font-family: 'SFProDisplay'; */
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: center;
}
.footer-para {
  font-size: 20px;
  font-weight: 400;
}
hr.h-rule {
  border-top: 0.4px solid #fff;
  opacity: 0.2;
}
.site-author {
  font-size: 14px;
}
@media screen and (max-width: 500px) {
  .footer-header {
    font-size: 32px;
  }
  .footer-para {
    font-size: 20px;
  }
}
</style>
