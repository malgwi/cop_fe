<template>
  <section class="steps">
      <div class="row">
          <div class="col-md-4 col-12">
              <div class="img-wrap my-4 my-md-0 text-center">
                  <img src="~/assets/images/icons/open-an-account.svg" height="80px" width="80px" alt="phone step1">
                <p class="steps-text mt-3">Create Account</p>
              </div>
          </div>
          <div class="col-md-4 col-12">
              <div class="img-wrap my-4 my-md-0 text-center">
                  <img src="~/assets/images/icons/sharp-travel-explore.svg" height="80px" width="80px" alt="phone step2">
                <p class="steps-text mt-3">Explore Community</p>
              </div>
          </div>
          <div class="col-md-4 col-12">
              <div class="img-wrap my-4 my-md-0 text-center">
                  <img src="~/assets/images/icons/sharp-event-available.svg" height="80px" width="80px" alt="phone step3">
                <p class="steps-text mt-3">Publish an Event</p>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.steps{
    padding-left: 168px;
    padding-right: 168px;
    margin-top: 100px;
    padding-bottom: 100px;
}
.steps-text{
    font-size: 26px;
    font-style: normal;
    font-weight: bold;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: center;
}
@media screen and (max-width: 500px) {
    .steps{
        padding-left: 18px;
        padding-right: 18px;
        margin-top: 50px;
        padding-bottom: 68px;
    }
}
</style>