<template>
  <div class="mt-5">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <div class="w-25 d-flex flex-nowrap justify-content-around">
          <button
            :disabled="currentPage <= 1"
            @click="gotoPage(currentPage - 1)"
            class="btn pagination-btn"
          >
            <i class="fa fa-angle-left"></i>
          </button>
          <button
            v-for="btn in numberOfBtn"
            :key="btn"
            @click="gotoPage(btn)"
            class="btn pagination-btn"
            :class="{ 'bg-primary text-white': currentPage == btn }"
          >
            {{ btn }}
          </button>
          <button
            :disabled="currentPage >= lastPage"
            @click="gotoPage(currentPage + 1)"
            class="btn pagination-btn"
          >
            <i class="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    lastPage: {
      type: Number,
      default: null
    },
    total: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      currentPage: Number(this.$route.query.page_number) || 1
    };
  },
  computed: {
    numberOfBtn() {
      if (!this.total) {
        return 0;
      }
      return Math.ceil(this.total / 10);
    }
  },
  mounted() {
    this.$router.push({
      path: this.$route.path,
      query: {
        page_number: this.currentPage
      }
    });
  },
  methods: {
    gotoPage(number) {
      if (number < 1) return;
      if (number > this.lastPage) return;
      this.currentPage = number;
      this.$router.push({
        path: this.$route.path,
        query: {
          page_number: number
        }
      });
    }
  }
};
</script>

<style scoped>
.btn.pagination-btn {
  border: 1px solid #c6cbd4;
  border-radius: 2px;
}
</style>
