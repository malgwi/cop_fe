<template>
  <div class="pb-">
    <div class="container mt-5 min-vh-100">
      <div class="row position-relative">
        <Loader v-if="fetching"  size="5" opacity="0.2"  color="bg-danger" />
        <div v-else class="w-100">
          <div  class="col-12">    
            <div class="d-flex justify-content-end mb-3">
              <button @click="$router.back()" class="btn btn-primary submit-btn">
                Submit your event
          </button>
              </div>     
            <div class="card event-banner bg-dark text-white">
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
                alt="Event banner"
              />
              <div
                class="card-img-overlay d-flex justify-content-center align-items-center flex-column"
              >
                <h1>{{ eventDetails.title }}</h1>
                <p>{{ eventDetails.event_date }}, {{ eventDetails.start_time }}, {{eventDetails.state}}</p>
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
    <Sponsors />
  </div>
</template>

<script>
export default {
  layout: "user",
  middleware: "auth-user",
  watchQuery: true,
  name: "event-detail",
  async asyncData({ store, route }) {
    try {
      const id = route.params.id;
      const eventDetails = await store.getters.getEvent(id);
      return {
        eventDetails,
      };
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      eventDetails: {},
      fetching: true,
    };
  },
  mounted(){
    if(!this.eventDetails){
      this.fetchEvent()
      }else {
        this.fetching = false
      }
  },  
  methods: {
    async fetchEvent(){
      const details = await this.$axios.$get('/user/event/'+this.$route.params.id)
      console.log(details);
    this.eventDetails = details
    this.fetching = false      
    }
  }
};
</script>

<style scoped>
.event-banner{
  max-height: 330px;  
  overflow: hidden;
}
.event-banner img {
  width: 100%;
}

.card-img-overlay {
  background: rgba(0,0,0,0.5);
}
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
