<template>
  <div class="card">
    <img
      src="~/assets/images/mdss-future-vector.jpg"
      class="card-img-top"
      alt="make sense"
    />
    <div class="card-body">
      <div class="d-flex align-items-center">
        <h5 class="card-title text-primary m-0">Surveillance</h5>
        <!-- <span class="spacer mx-2"></span>
        <span class="duration">5min Read</span> -->
      </div>
      <p class="card-text summary mt-2">
        Antimicrobial Resistance Surveillance Capacity Assessment Checklist
      </p>
      <p>
        Nigeria has an estimated population of 182 million people, which is expected to 
        rise to over 200 million by the year 2025. In 2013, the life expectancy at birth 
        in Nigeria was estimated at 54 years...
      </p>
      <a href="/77_1511368219.pdf" target="_blank" class="card-link"> Read More </a>
    </div>
    <ul class="list-group list-group-flush">
      <!-- <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="img-wrap ">
          <img src="~/assets/images/author-img.png" alt="author" />
        </div>
        <span class="duration badge badge-pill">2 Days ago</span>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  border-radius: 0 !important;
}
.card-title.text-primary {
  font-size: 13px;
  font-weight: 600;
}
.spacer {
  border: 1px solid #dedede;
  background: #dedede;
  width: 15px;
  height: 0;
}
.summary {
  font-size: 18px;
  color: #000000;
}
.duration {
  font-size: 13px;
  font-weight: 600;
  color: #0000004d;
}
.img-wrap {
  height: 28px;
  width: 28px;
  border-radius: 100%;
  overflow: hidden;
}
</style>
