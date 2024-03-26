<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="info-card bg-primary p-3">
          <div class="d-flex justify-content-between">
            <h3 class="text-white info-heading">
              Total <br />
              Topics
            </h3>
            <h3 v-if="fetching" class="text-white info-total">
              <b-spinner type="grow" small></b-spinner>
            </h3>
            <h3 v-else class="text-white info-total">{{ userPosts }}</h3>
          </div>
          <hr class="hr" />
          <button class="info-btn text-primary btn">
            <nuxt-link to="/user/topics">View</nuxt-link>
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <div class="info-card bg-primary p-3">
          <div class="d-flex justify-content-between">
            <h3 class="text-white info-heading ">Total <br />Events</h3>
            <h3 v-if="fetching" class="text-white info-total">
              <b-spinner type="grow" small></b-spinner>
            </h3>
            <h3 v-else class="text-white">{{ userEvents }}</h3>
          </div>
          <hr class="hr" />
          <button class="info-btn text-primary btn">
            <nuxt-link to="/user/events">View</nuxt-link>
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <div class="info-card bg-primary p-3">
          <div class="d-flex justify-content-between">
            <h3 class="text-white info-heading">
              Total <br />
              Comments
            </h3>
            <h3 class="text-white">5</h3>
          </div>
          <hr class="hr" />
          <button class="info-btn text-primary btn">
            <nuxt-link to="/user/dashboard">View</nuxt-link>
          </button>
        </div>
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
      userPosts: null,
      userComments: null,
      userEvents: null,
      fetching: true
    };
  },
  computed: {
    totalUserPosts() {
      return this.$store.getters["getUserPosts"];
    }
  },
  async created() {
    try {
      const posts = await this.$store.dispatch("user/fetchUserDiscussions");
      const events = await this.$store.dispatch("user/fetchUserEvents");
      this.userPosts = posts.data.total;
      this.userEvents = events.data.total;
      this.fetching = false;
    } catch (error) {
      this.$bvToast.toast("Please check your connection or reload page", {
        title: "Network Error",
        variant: "danger"
      });
    }
  }
};
</script>

<style scoped>
.info-card {
  border-radius: 8px;
  min-height: 118px;
}
.hr {
  border-top: 1px solid white;
  opacity: 0.3;
}
.info-btn {
  width: 60px;
  height: 32px;
  border-radius: 4px;
  outline: none;
  background: #fff;
  line-height: 10px;
}
.info-heading {
  font-size: 12px;
  font-weight: 600;
}
</style>
