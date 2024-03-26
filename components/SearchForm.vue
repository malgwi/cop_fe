<template>
  <form @submit.prevent="searchText" class="form">
    <div class="form-group required">
      <input
        v-model="text"
        type="text"
        class="form-control p-4"
        placeholder="Search community here..."
      />
      <!-- <button class="btn btn-primary">Submit</button> -->
    </div>
  </form>
</template>

<script>
export default {
  name: "search-form",
  watch: {
    text: function() {
      if (this.text == "") {
        this.searchText();
      }
    }
  },
  data() {
    return {
      text: "",
      currentPath: this.$route.path
    };
  },
  methods: {
    async searchText() {
      const queries = {
        page: "",
        keyword: this.text,
        category: ""
      };
      this.$router.push({
        path: this.currentPath,
        query: {
          page: "1",
          keyword: this.text,
          category: ""
        }
      });
      try {
        this.$store.dispatch("searchDiscussions", queries);
      } catch (error) {
        this.$bvToast.toast(
          "Search failed, please check connection or refresh this page.",
          {
            title: "Network Error",
            variant: "danger"
          }
        );
      }
    }
  }
};
</script>

<style></style>
