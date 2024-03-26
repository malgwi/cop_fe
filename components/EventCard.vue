<template>
  <div class="event-card flex-shrink-0 p-4">
    <h1 class="event-heading">
      <router-link :to="`${$route.path}/${event.id}`">{{
        event.title
      }}</router-link>
    </h1>
    <div class="event-content">
    <p class="event-text">{{ truncate(event.description, 120) }}</p>
    <div class="date-time d-flex flex-column">
      <div class="d-flex align-items-center mb-2">
        <img class="" src="~/assets/images/icons/calender.png" alt="" />
        <span class="ml-1">{{ event.event_date }}</span>
      </div>
      <class class="d-flex align-items-center mb-2">
        <img class="" src="~/assets/images/icons/clock.png" alt="" />
        <span class="ml-1">{{ event.start_time }}</span>
      </class>
      <class class="d-flex align-items-center mb-2">
        <img class="" src="~/assets/images/icons/clock.png" alt="" />
        <span class="ml-1">{{ event.state }}</span>
      </class>
      <button
        @click="deleteEvent(event.id)"
        v-if="isAdmin"
        class="d-flex align-items-center btn btn-primary"
      >
        <b-spinner v-if="deleting" label="Large Spinner" small></b-spinner>
        <!-- <img class="" src="~/assets/images/icons/clock.png" alt="" /> -->
        <span class="ml-1">Delete</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {},
      required: true
    },
    layout: "user"
  },
  data() {
    return {
      deleting: false,
      fetching: true
    };
  },
  computed: {
    isAdmin() {
      if (!this.$auth?.user) return false;
      return this.$auth.user.account_type === "admin";
    }
  },
  methods: {
    deleteEvent(id) {
      this.$emit("deleteEvent", id);
    },

    truncate(content, length) {
      if (!content) return;
      let summary = this.stripHtml(content);
      if (summary.length > length) return summary.slice(0, 127) + "...";
      return summary;
    },
    stripHtml(html) {
      return html.replace(/<[^>]+>/g, "");
    },
    giveAuthurName(name) {
      if (!name) return "Anonymous";
      return name;
    }
  }
};
</script>

<style scoped>
.event-card {
  border: 0.4px solid rgba(32, 32, 32, 0.2);
  /* min-height: 201px; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.event-heading {
  font-family: "SFProDisplay";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 32px;
  /* identical to box height */
  letter-spacing: -0.02em;
  /* Black */
  color: #202020;
  opacity: 0.8;
}
.event-content{
  height: 100%;
  overflow: auto;
}
.event-text{
  margin-top: 10px;
}
.date-time{
  margin-top: 20px;
}
@media screen and (max-width: 500px) {
  .event-card {
    flex-shrink: 0;
  }
  .event-card span {
    font-size: 10px;
  }
}
</style>
