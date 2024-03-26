<template>
  <div class="pb-">
    <div class="container mt-5 min-vh-100">
      <div class="row mb-3">
        <div class="col-sm">
          <h2>Awareness Activities</h2>
        </div>
      </div>
      <div class="row align-items-center">
        <!-- <div class="col-sm-2 mb-3">
          <select class="form-control form-select">
            <option value="">All</option>
            <option>Upcoming</option>
            <option>Past</option>
          </select>
        </div> -->
        <div class="col-sm mb-3 position-relative">
          <Dropdown
            title="States"
            :events="events"
            :items="nigeriaState"
            @itemClick="itemClick"
          />
        </div>

        <div class="col-sm mb-3 d-md-flex justify-content-md-end ">
          <template v-if="isUser">
            <nuxt-link class="text-white" to="/create-event">
              <button class="btn btn-primary submit-btn">
                Submit your event
              </button>
            </nuxt-link>
          </template>

          <template v-else>
            <a class="text-white" 
            href="https://docs.google.com/forms/d/e/1FAIpQLSful5MTavDOP8eDOu7FB6eCf7SKQNQqSrM5APLmu4AIloQXDA/viewform?vc=0&c=0&w=1&flr=0">
              <button class="btn btn-primary submit-btn">
                Submit your event
              </button>
            </a>
          </template>
        </div>
      </div>
      <hr />
      <div class="w-100 mt-5 position-relative">
        <Loader class="h-50" v-if="fetching" size="5" opacity="0.2" />
        <div v-if="!fetching && !events.length" class="h-100 w-100">
          <h1 class="text-center">No events available</h1>
        </div>
        <div class="row" v-if="!fetching && events.length">
          <div class="col-sm-4 mb-3">
            <EventsMap :events="fetchedEvents" @markerClick="markerClick" />
          </div>

          <div
            class="col-sm-8 mb-3 overflow-auto events-col row"
            v-if="show === ''"
          >
            <div v-for="(event, index) in fetchedEvents" :key="index" class="col-sm-6 mb-3">
              <EventCard :event="event" @deleteEvent="deleteEvent" />              
            </div>
          </div>

          <div
            class="col-sm-8 mb-3 overflow-auto events-col row"
            v-else
          >
            <div v-for="(event, index) in fetchedEvents" :key="index" class="col-sm-6 mb-3">
              <template v-if="event.state === marker">
                <div v-show="!locationShow" >
                  <EventCard :event="event" @deleteEvent="deleteEvent" />
                </div>
              </template>

              <template v-if="event.state === location">
                <div v-show="locationShow">
                  <EventCard :event="event" @deleteEvent="deleteEvent" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <!-- <div v-if="!fetching && events.length" class="col-12 pb-5">
        <Pagination :lastPage="last_page" :total="total" />
      </div> -->
    </div>
    <Sponsors />
  </div>
</template>

<script>
import Dropdown from "../../components/DropDown";
import { stateList } from "../../helpers/nigeria_states";

export default {
  layout: "user",
  middleware: "auth-user",
  watchQuery: true,
  components: {
    Dropdown
  },
  data() {
    return {
      userType: "",
      fetching: true,
      last_page: null,
      total: null,
      marker: "",
      nigeriaState: stateList,
      location: "",
      show: "",
      locationShow: "",
      fetchedEvents: []
    };
  },
  watch: {
    "$route.query": function() {
      this.fetchAllEvents();
    }
  },
  async mounted() {
    // try {
    //   await this.$store.dispatch("fetchAllEvents");
    //   this.fetching = false;
    // } catch (error) {
    //   console.log(error);
    //   this.fetching = false;
    // }
    this.fetchAllEvents();

    this.isUser = this.$auth.user?.account_type === "admin";
  },
  computed: {
    events() {
      return this.$store.getters["getEvents"];
    }
  },
  methods: {
    async fetchAllEvents() {
      this.fetching = true;
      const page = this.$route.query.page_number;
      try {
        const { data } = await this.$store.dispatch("fetchAllEvents", page);
        this.first_page = data.first_page;
        this.last_page = data.last_page;
        this.total = data.total;
        this.fetching = false;
        this.fetchedEvents = data.data;
      } catch (error) {
        this.$bvToast.toast(
          "Could not fetch Events, please check your connection or refresh page.",
          {
            title: "Netwrok Error",
            variant: "danger"
          }
        );
        this.fetching = false;
      }
    },

    async deleteEvent(id) {
      console.log("string", id);
      this.deleting = true;
      try {
        // await this.$axios.$delete(`/admin/event/${id}`);
        await this.$axios.$get(`/admin/event/delete/${id}`).then(res => {
          console.log(res);
          this.$bvToast.toast("Event deleted"),
            {
              title: "Successful",
              variat: "success"
            };
        });
        this.$emit("deletedEvent");
        this.deleting = false;

        this.fetchedEvents = this.fetchedEvents.filter(
          event => event.id !== id
        );
      } catch (error) {
        console.log(error);
        this.$bvToast.toast("Event could not be deleted.", {
          title: "Unsuccessful",
          variant: "danger"
        });
        this.deleting = false;
      }
    },

    markerClick(e) {
      this.marker = e;
      this.show = e;
      this.locationShow = false;
    },

    itemClick(e) {
      this.location = e;
      this.show = e;
      this.locationShow = true;
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

.submit-btn {
  width: 172px;
  height: 39px;
  border-radius: 20px !important;
}

.leaflet-container {
  /* position: absolute; */
  /* top: 0; */
  /* bottom: 0; */
  height: 80vh;
}

.events-col {
  max-height: 650px;
  height: 100%;
  
}
</style>
