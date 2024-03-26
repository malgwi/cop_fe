<template>
  <div class="pb- min-vh-100">
    <div class="container my-4">
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <label for="year-select" class="mr-2">Sort by Year:</label>
          <select v-model="selectedYear" id="year-select" @change="filterByYear">
            <option value="">Select Year</option>
            <option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div>
          <h3>AMR Newsletter</h3>
        </div>
        <div>
          <template v-if="isAdmin">
            <nuxt-link to="/admin/create-repo" class="post-btn__lg btn btn-primary">
              Contribute here
            </nuxt-link>
          </template>
        </div>
      </div>
      <div class="row">
        <div style="min-height: 75vh;" class="col-md-12">
          <Loader class="h-50" v-if="fetching" size="5" opacity="0.2" />
          <div v-if="!knowledgeRepos.length" class="text-center">
            <h1>Empty knowledge repository</h1>
          </div>
          <div v-else class="row equal-height-cards">
            <div v-for="repo in knowledgeRepos" :key="repo.id" class="col-md-4 my-2">
              <BlogCard
                @deletedRepo="fetchRepo"
                :repoId="repo.id"
                :title="repo.title"
                :publish_date="repo.publish_date"
                :description="repo.description"
                :thumbnail="repo.thumbnail"
                :file="repo.file"
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
import BlogCard from "../components/BlogCard2.vue";
import Loader from "~/components/Loader.vue";

export default {
  layout: "user",
  data() {
    return {
      isAdmin: this.$auth?.user?.account_type === "admin",
      knowledgeRepos: [],
      fetching: true,
      sortBy: "publish_date",
      selectedYear: "",
    };
  },

  async created() {
    await this.fetchRepo();
  },

  computed: {
    uniqueYears() {
      return [...new Set(this.knowledgeRepos.map(repo => new Date(repo.publish_date).getFullYear()))];
    },
  },

  methods: {
    async fetchRepo() {
      try {
        let resp;

        if (this.sortBy === "year" || this.sortBy === "month") {
          resp = await this.$axios.$get("/community/knowledge-repo");
        } else {
          resp = await this.$axios.$get("/community/knowledge-repo", {
            params: {
              sortBy: "publish_date",
            },
          });
        }

        this.knowledgeRepos = this.sortReposBy(resp.data);
        this.fetching = false;
      } catch (error) {
        this.fetching = false;
        this.$bvToast.toast("Could not fetch data", {
          title: "Network Error",
          variant: "danger",
        });
      }
    },

    filterByYear() {
      if (this.selectedYear === "") {
       // If no year is selected, reset to the original list
      this.fetchRepo();
    } else {
        const filteredRepos = this.knowledgeRepos.filter(repo => new Date(repo.publish_date).getFullYear() === parseInt(this.selectedYear));
        this.knowledgeRepos = this.sortReposBy(filteredRepos);
      }
    },

    sortReposBy(repos) {
      if (this.sortBy === "publish_date") {
        return repos.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
      } else if (this.sortBy === "year") {
        return repos.sort((a, b) => new Date(b.publish_date).getFullYear() - new Date(a.publish_date).getFullYear());
      } else if (this.sortBy === "month") {
        return repos.sort((a, b) => new Date(b.publish_date).getMonth() - new Date(a.publish_date).getMonth());
      }
    },
  },

  components: { Loader },
};
</script>

<style scoped>
.equal-height-cards {
  display: flex;
  flex-wrap: wrap;
}

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.blog-card .card-body {
  flex-grow: 1;
}

.post-btn__lg {
  background: #119859;
  min-width: 160px;
  height: 42px;
  border-radius: 25px;
}
</style>
