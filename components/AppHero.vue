<!-- Please remove this file from your project -->
<template>
  <div class="container">
    <div class="row d-flex">
      <div class="col-md-7 col-12 mb-3 mb-md-0">
        <div
          class="h-100 d-flex align-items-md-center pb-2 flex-column justify-content-end"
        >
          <h1 class="hero-heading">
            Join Nigeria fastest growing (AMR/AMU) Community!
          </h1>
          <p class="hero-para mt-3">
            The National One Health Antimicrobial Resistance/Antimicrobial Usage
            (AMR/AMU) Community of Practice (CoP) is an online community that
            aids users and members to interact and share resources regarding AMR
            in the country. <br><br>
            To share an AMR-Related event, publication, report, join our community.
          </p>
          <div class="w-100 d-md-block d-flex justify-content-center">
            <div class="btn btn-primary">
              <nuxt-link to="/auth/register" class="text-white"
                >Join Our Community</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-12 order-first order-md-last">
        <div class="d-md-block d-flex justify-content-center">
          <img
            class="hero-image"
            src="https://res.cloudinary.com/travel-wahoo/image/upload/v1629457953/antimicrobial_mt4lyj.jpg"
            alt="Nigerian"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.nav-btn,
.nav-input {
  height: 30px;
}
.nav-btn {
  width: 80px;
  line-height: 2px !important;
}
.hero-image {
  width: 69%;
}
.hero-heading {
  font-weight: 700;
  font-size: 50px;
}
.hero-para {
  font-weight: 400;
  font-size: 16px;
}
.sponsor-img {
  width: 200px;
  height: 50px;
}
@media screen and (max-width: 500px) {
  .hero-heading {
    font-size: 30px;
    text-align: center;
  }
  .hero-para {
    text-align: center;
  }
}
</style>
