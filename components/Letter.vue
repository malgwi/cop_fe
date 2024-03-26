<template>
  <div
    @click="searchByLetter(letter)"
    :class="[active === true ? 'active text-white' : 'bg-secondary']"
    class="letter d-flex justify-content-center align-items-center p-3 rounded-lg"
  >
    {{ letter }}
    <b-spinner
      v-if="isFetching"
      type="grow"
      small
      class=" position-absolute"
    ></b-spinner>
  </div>
</template>

<script>
export default {
  props: {
    letter: ""
  },
  data() {
    return {
      active: false,
      isFetching: false
    };
  },
  methods: {
    async searchEmpty() {
      this.isFetching = true;
      this.$router.push({
        path: this.currentPath,
        query: {
          page: "",
          keyword: "",
          category: ""
        }
      });
      await this.$store.dispatch("searchDiscussions", {
        page: "",
        keyword: "",
        category: ""
      });
      this.isFetching = false;
    },
    searchByLetter(letter) {
      this.isFetching = true;
      this.active = !this.active;
      if (!this.active) {
        this.searchEmpty();
        this.isFetching = false;
      }
      const queries = {
        page: "",
        keyword: letter,
        category: ""
      };
      this.$router.push({
        path: this.currentPath,
        query: {
          page: "",
          keyword: this.letter,
          category: ""
        }
      });
      try {
        this.isFetching = true;
        this.$store.dispatch("searchDiscussions", queries);
        this.isFetching = false;
        this.$emit("closeLetters");
      } catch (error) {
        this.isFetching = false;
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
