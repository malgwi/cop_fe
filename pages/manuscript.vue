<template>
  <div class="pb-5 min-vh-100">
    <div class="container my-4">
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <h3>Manuscript</h3>
        </div>
        <div>
          <template v-if="isAdmin">
            <nuxt-link to="/admin/CreateManuscript" class="btn btn-primary">
              Contribute here
            </nuxt-link>
          </template>
        </div>
      </div>

      <div class="row">
        <div style="min-height: 75vh;" class="col-md-12">
          <Loader v-if="fetching" size="5" opacity="0.2" />
          <div v-if="!manuscript.length" class="text-center">
            <h1>Empty Manuscript</h1>
          </div>

          <div v-else class="row">
            <div v-for="manu in manuscript" :key="manu.id" class="col-md-12 my-4">
              <ManuscriptCard
                @deletedManuscript="fetchManuscript"
                :manuId="manu.id"
                :title="manu.title"
                :author_name="manu.author_name"
                :publication_date="manu.publication_date"
                :url="manu.url"
                class="blog-card"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Sponsors />
  </div>
</template>

<script>
import ManuscriptCard from "../components/ManuscriptCard.vue";
import Loader from "~/components/Loader.vue";

export default {
  layout: "user",
  data() {
    return {
      fetchedManuscripts: [],
      manuscript: [],
      fetching: true,
    };
  },
  computed: {
    isAdmin() {
      if (!this.$auth?.user) return false;
      return this.$auth.user?.account_type === "admin";
    },
  },
  async created() {
    this.fetchManuscript();
  },
  methods: {
    openModal() {
      this.$bvModal.show("modal-1");
    },
    async fetchManuscript() {
      try {
        const resp = await this.$axios.$get("/community/manuscript");
        this.fetchedManuscripts = resp.data;
        this.manuscript = this.fetchedManuscripts;
        this.fetching = false;
        console.log(resp.data);
      } catch (error) {
        this.fetching = false;
        this.$bvToast.toast("Could not fetch data", {
          title: "Network Error",
          variant: "danger",
        });
      }
    },
  },
  components: { Loader },
};
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.blog-card .card-body {
  flex-grow: 1;
}
</style>
