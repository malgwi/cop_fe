<template>
  <div class="pb-5">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6 col-12">
          <h2>Your Events</h2>
        </div>
        <div class="col-md-6 col-12 d-md-flex justify-content-md-end ">
          <button class="btn btn-primary submit-btn">
            <nuxt-link class="text-white" to="/create-event"
              >Submit your event</nuxt-link
            >
          </button>
        </div>
      </div>
      <div class="row mt-5 position-relative">
        <Loader class="h-100" v-if="fetching" size="5" opacity="0.2" />
        <div
          v-for="event in events"
          :key="event.id"
          class="col-md-6 mt-3 mt-md-3"
        >
          <EventCard :event="event" />
        </div>
      </div>
      <!-- Pagination -->
      <div v-if="!fetching" class="col-12 pb-5">
        <Pagination :lastPage="last_page" :total="total" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user",
  middleware: "auth-user",
  data() {
    return {
      fetching: true
    };
  },
  watchQuery: true,
  data() {
    return {
      fetching: true,
      last_page: null,
      total: null
    };
  },
  watch: {
    "$route.query": function() {
      this.fetchUserEvents();
    }
  },
  computed: {
    events() {
      return this.$store.getters["user/getUserEvents"];
    }
  },
  methods: {
    async fetchUserEvents() {
      this.fetching = true;
      try {
        const { data } = await this.$store.dispatch("user/fetchUserEvents");
        this.first_page = data.first_page;
        this.last_page = data.last_page;
        this.total = data.total;
        this.fetching = false;
      } catch (error) {
        console.log(error);
        this.fetching = false;
      }
    }
  },
  async mounted() {
    this.fetchUserEvents();
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

.submit-btn {
  width: 172px;
  height: 39px;
  border-radius: 20px !important;
}
</style>
