<template>
  <div class="bg-secondary">
    <div class="container ">
      <div class="row">
        <div
          class="sponsors pl-3 px-md-4 px-md-0 w-100 align-items-center py-md-5 bg d-flex justify-content-around"
        >
          <div
            title="The Federal Ministry of Environment Nigeria"
            class="sponsor-img d-flex align-items-center justify-content-center"
          >
            <img
              class="img-fluid"
              src="~/assets/images/FMEN2.png"
              alt="The Federal Ministry of Environment Nigeria"
            />
          </div>
          <div
            title="The Federal Ministry Of Health"
            class="sponsor-img d-flex align-items-center justify-content-center"
          >
            <img
              class="img-fluid"
              src="~/assets/images/MOH.png"
              alt="Federal Ministry Of Health"
            />
          </div>
          <div
            title="The Federal Ministry of Agriculture and Rural Development"
            class="sponsor-img d-flex align-items-center justify-content-center ml-2 ml-md-0"
          >
            <img
              class="img-fluid"
              src="~/assets/images/fmard.jpg.webp"
              alt="The Federal Ministry of Agriculture and Rural Development"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sponsor-img {
  width: 200px;
  height: 50px;
  padding-bottom: 60px;
  padding-top: 50px;
}
@media screen and (max-width: 500px) {
  .sponsor-img {
    text-align: center;
  }
  .sponsor-img img {
    height: 32px !important;
  }
}
</style>
