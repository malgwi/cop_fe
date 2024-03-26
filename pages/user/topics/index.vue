<template>
  <div>
    <div class="container mt-4">
      <div class=" mb-3 d-flex justify-content-between align-items-center">
        <div>
          <nav aria-label="breadcrumb ">
            <ol class="breadcrumb m-0 p-0">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Home</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Topics</li>
            </ol>
          </nav>
          <h3>Topics</h3>
        </div>
        <div>
          <button class="post-btn__lg btn btn-primary">
            <nuxt-link :to="`/create-post`" class="text-white"
              >Create New Topic</nuxt-link
            >
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between justify-content-md-end">
            <div class="form-group required">
              <select class="form-control sort-select">
                <option class="webster" value="pending">Status: Pending</option>
                <option class="webster" value="approved"
                  >Status: Approved</option
                >
              </select>
            </div>
            <div class="form-group required ml-2">
              <select class="form-control sort-select">
                <option class="webster" value="">Category: All</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <Loader class="h-100" v-if="fetching" size="5" opacity="0.2" />
          <UserTopicsTable :topics="allTopics" />
        </div>
        <div v-if="!fetching" class="col-12 pb-5">
          <Pagination :lastPage="last_page" :total="total" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topics-paginated",
  layout: "user",
  middleware: "auth-user",
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
      this.fetchDiscussions();
    }
  },
  computed: {
    allTopics() {
      return this.$store.getters["user/getUserDiscussions"];
    }
  },
  async mounted() {
    this.fetchDiscussions();
  },
  methods: {
    openModal() {
      this.$bvModal.show("modal-1");
    },
    async fetchDiscussions() {
      this.fetching = true;
      const page = this.$route.query.page_number;
      try {
        const { data } = await this.$store.dispatch(
          "user/fetchUserDiscussions",
          page
        );
        this.first_page = data.first_page;
        this.last_page = data.last_page;
        this.total = data.total;
        this.fetching = false;
      } catch (error) {
        this.$bvToast.toast(
          "Could not fetch topics, please check your connection or refresh page.",
          {
            title: "Netwrok Error",
            variant: "danger"
          }
        );
        this.fetching = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-header {
  display: block;
  border-bottom: 0 !important;
}

.modal-footer {
  border-top: 0 !important;
}

.modal-heading {
  font-size: 22px;
  font-weight: 600;
}

.heading-text {
  width: 63%;
}

.post-btn__lg {
  background: #119859;
  width: 160px;
  height: 42px;
  border-radius: 25px;
}

.breadcrumb {
  background: transparent;
}

.sort-select {
  width: 185px;
  border-radius: 6px;
  height: 40px;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
</style>
