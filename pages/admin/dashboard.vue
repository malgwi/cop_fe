<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-4 mt-3">
        <div class="info-card bg-primary p-3">
          <div class="d-flex justify-content-between">
            <h3 class="text-white info-heading">
              Total <br />
              User
            </h3>
            <h3 v-if="!totalUsers" class="text-white info-total">
              <b-spinner type="grow" small></b-spinner>
            </h3>
            <h3 v-else class="text-white info-total">{{ totalUsers }}</h3>
          </div>
          <hr class="hr" />
          <button class="info-btn text-primary btn">
            <nuxt-link to="/admin/users">View</nuxt-link>
          </button>
        </div>
      </div>
      <div class="col-md-4 mt-3">
        <div class="info-card bg-primary p-3">
          <div class="d-flex justify-content-between">
            <h3 class="text-white info-heading">
              Total <br />
              Topics
            </h3>
            <h3 v-if="!totalDiscussions" class="text-white info-total">
              <b-spinner type="grow" small></b-spinner>
            </h3>
            <h3 v-else class="text-white info-total">{{ totalDiscussions }}</h3>
          </div>
          <hr class="hr" />
          <button class="info-btn text-primary btn">
            <nuxt-link to="/admin/topics">View</nuxt-link>
          </button>
        </div>
      </div>
      <div class="col-md-4 mt-3">
        <div class="info-card bg-primary p-3">
          <div class="d-flex justify-content-between">
            <h3 class="text-white info-heading">
              Total <br />
              Pending Topics
            </h3>
            <h3 class="text-white info-total">{{ pendinTopics }}</h3>
          </div>
          <hr class="hr" />
          <button class="info-btn text-primary btn">
            <nuxt-link to="/admin/topics">View</nuxt-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-dashboard",
  layout: "admin",
  middleware: "auth-admin",
  data() {
    return {
      totalUsers: null,
      totalDiscussions: null,
      userEvents: null,
      allTopic: []
    };
  },
  async mounted() {
    try {
      const totalUsers = await this.$store.dispatch("admin/fetchAllUser");
      this.totalUsers = totalUsers.total;
      const totalDiscussions = await this.$store.dispatch(
        "admin/fetchAllDiscussions"
      );
      this.allTopic = totalDiscussions.data;
      this.totalDiscussions = totalDiscussions.total;
      // const events = await this.$store.dispatch('fetchAllEvents')
      // this.userEvents = events.data.total
      // await this.$axios.patch('/user/profile',{
      //   first_name: 'Peter',
      //   last_name: 'Olu',
      //   city: 'Abuja'
      // }).then( resp => console.log('User patched', resp))
    } catch (error) {
      throw error;
    }
  },
  computed: {
    totalTopics() {
      return this.$store.getters["admin/getAllDiscussion"];
    },
    pendinTopics() {
      const pending = this.allTopic.filter(disc => disc.status === "pending");
      return pending.length;
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
