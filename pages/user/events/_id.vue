<template>
  <div class="pb-5">
    <div class="container mt-5">
      <div class="row position-relative">
        <div class="col-12">
          <div class="card bg-dark text-white">
            <img
              v-if="eventDetails.banner"
              :src="eventDetails.banner"
              class="card-img"
              alt="hero banner"
            />
            <img
              v-else
              src="~/assets/images/hero-banner.png"
              class="card-img"
              alt="hero banner"
            />
            <div
              class="card-img-overlay d-flex justify-content-center align-items-center flex-column"
            >
              <h1>{{ eventDetails.title }}</h1>
              <p>
                {{ eventDetails.event_date }}, {{ eventDetails.start_time }}, {{eventDetails.state}}
              </p>
              <div>
                <i class="fa fas-world"></i>
                <i class="fa fas-envelop"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div v-html="eventDetails.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user",
  middleware: "auth-user",
  watchQuery: true,
  name: "event-detail",
  data() {
    return {
      eventDetails: {}
    };
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const { data } = await this.$store.dispatch("user/fetchUserEvents");
      this.eventDetails = data.data.find(event => event.id == id);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.submit-event {
  border-radius: 25px;
}
.slide-card {
  width: 100% !important;
}
.btn.pagination-btn {
  border: 1px solid #c6cbd4;
  border-radius: 2px;
}
</style>
