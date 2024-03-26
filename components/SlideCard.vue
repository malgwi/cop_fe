<template>
  <div class="slide-card flex-shrink-0 p-4">
    <h1 class="slide-heading">
      <router-link :to="`/events/${event.id}`">{{ event.title }}</router-link>
    </h1>
    <p class="slide-text">{{ truncate(event.description, 120) }}</p>
    <div class="date-time d-flex ">
      <div class="d-flex align-items-center">
        <img class="" src="~/assets/images/icons/calender.png" alt="" />
        <span class="ml-1">{{ event.event_date }}</span>
      </div>
      <div class=" ml-3 d-flex align-items-center">
        <img class="" src="~/assets/images/icons/clock.png" alt="" />
        <span class="ml-1">{{ event.start_time }}</span>
      </div>
      <div class=" ml-3 d-flex align-items-center">
        <img class="" src="~/assets/images/icons/clock.png" alt="" />
        <span class="ml-1">{{ event.state }}</span>
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
    }
  },
  methods: {
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

<style>
.slide-card {
  border: 0.4px solid rgba(32, 32, 32, 0.2);
  min-width: 450px;
  max-width: 450px;
  max-height: 220px;
}
.slide-text{
    min-height: 72px;
}
.slide-heading {
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
@media screen and (max-width: 500px) {
  .slide-card {
    min-width: 290px;
    max-width: 290px;
    flex-shrink: 0;
  }
  .slide-card span {
    font-size: 10px;
  }
}
</style>
