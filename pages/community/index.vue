<template>
  <div class="page-container d-flex flex-column justify-content-between">
    <div class="container  mt-5">
      <div class="comm-heading">
        <h1>Support Communities</h1>
        <p class="fs-7">
          Do you want to present at the next COP meeting?
          <a href="#">submit a topic?</a>
        </p>
      </div>
      <div class="row mt-4 mt-md-0">
        <div class="col-md-9 col-12">
          <div
            class="d-flex w-100 flex-col border-bottom flex-column flex-md-row align-items-center"
          >
            <div
              class="total-topics btn btn-primary d-flex justify-content-center align-items-center"
            >
              {{ allDiscussions.length }} topics
            </div>
            <div class="topic-tabs mt-4 mt-md-0 ml-md-auto">
              <nav class="nav nav-pills flex-column flex-sm-row">
                <a
                  @click="changeSortType('TRENDING')"
                  :class="[sortType === 'TRENDING' ? 'active' : 'text-muted']"
                  class="flex-sm-fill cat-tab text-sm-center mx-3 nav-link text-center"
                  >TRENDING</a
                >
                <a
                  @click="changeSortType('AZ')"
                  :class="[sortType === 'AZ' ? 'active' : 'text-muted']"
                  class="flex-sm-fill cat-tab text-sm-center mx-3 nav-link text-center text-muted"
                  >A - Z</a
                >
                <a
                  @click="changeSortType('CATEGORY')"
                  :class="[sortType === 'CATEGORY' ? 'active' : 'text-muted']"
                  class="flex-sm-fill cat-tab text-sm-center mx-3 nav-link text-center text-muted"
                  >CATEGORY</a
                >
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <!-- <form class="form">
            <div class="form-group required">
              <input
                type="text"
                class="form-control p-4"
                placeholder="Search community here..."
              />
            </div>
          </form> -->
          <SearchForm />

          <div class="rounded w-100 mt-3 create-discussion p-4">
            <div
              class="d-flex flex-column align-items-center justif flex-md-row"
            >
              <p class="m-0">Can’t find what you’re looking for?</p>
              <div class="btn btn-primary ml-md-3">
                <nuxt-link to="/create-post" class="app-link__text text-white"
                  >Create a new discussion</nuxt-link
                >
              </div>
            </div>
          </div>

          <div v-if="sortType === 'AZ'" class="mt-5">
            <Letters @closeGrid="handleCLoseGrid" class="float-grid" />
          </div>
          <div v-if="sortType === 'CATEGORY'" class="mt-5">
            <div class="cat-wraper">
              <button
                class="btn btn-primary text-white"
                v-for="(cat, index) in categories"
                :class="{ 'ml-2': index > 0 }"
                :key="cat.id"
                @click="fetchByCategory(cat.id)"
              >
                {{ cat.name }}
              </button>
            </div>
          </div>

          <!-- list of trendings -->
          <div class="mt-5 pb-5">
            <div class="topics">
              <div class="row position-relative">
                <Loader class="h-100" v-if="fetching" size="5" opacity="0.2" />
                <div
                  v-for="discussion in allDiscussions"
                  :key="discussion.id"
                  class="col-md-4 mt-4"
                >
                  <PostCard :discussion="discussion" />
                </div>
              </div>
            </div>
          </div>
          <!-- infinte scroll indicator -->
          <div class="mt-5">
            <infinite-loading spinner="spiral" @infinite="infiniteScroll">
              <div slot="no-results">
                <h1>No Topics found</h1>
              </div>
            </infinite-loading>
          </div>
        </div>
      </div>
    </div>
    <Sponsors />
  </div>
</template>

<script>
import Loader from '~/components/Loader.vue';

export default {
    layout: "user",
    data() {
        return {
            sortType: "TRENDING",
            fetching: true
        };
    },
    middleware: "auth-user",
    computed: {
        allDiscussions() {
            return this.$store.getters["getDiscussions"];
        },
        categories() {
            return this.$store.getters["getPostCategories"];
        }
    },
    methods: {
        async infiniteScroll($state) {
            let currentPageNumber;
            let keyWord = this.$route.query.keyword;
            let category = this.$route.query.category;
            if (!this.$route.query.page) {
                currentPageNumber = 1;
            }
            else {
                currentPageNumber = Number(this.$route.query.page) + 1;
            }
            this.$router.push({
                path: this.currentPath,
                query: {
                    page: `${currentPageNumber}`,
                    keyword: keyWord,
                    category: category
                }
            });
            try {
                const resp = await this.$store.dispatch("addToDiscussions", {
                    page: `${currentPageNumber}`,
                    keyword: keyWord,
                    category: category
                });
                if (resp.data.data.length > 1) {
                    $state.loaded();
                }
                else {
                    $state.complete();
                }
            }
            catch (error) { }
        },
        async changeSortType(type) {
            this.sortType = type;
            if (this.sortType === "TRENDING") {
                this.isFetching = true;
                this.$router.push({
                    path: this.currentPath,
                    query: {
                        page: "1",
                        keyword: "",
                        category: ""
                    }
                });
                await this.$store.dispatch("searchDiscussions", {
                    page: "",
                    keyword: "",
                    category: ""
                });
            }
        },
        truncate(content) {
            let summary = content;
            if (summary.length > 130)
                return summary.slice(0, 127) + "...";
            return content;
        },
        handleCLoseGrid() {
            this.sortType = "";
        },
        async fetchByCategory(category) {
            this.$router.push({
                path: this.currentPath,
                query: {
                    page: "",
                    keyword: "",
                    category: `${category}`
                }
            });
            // this.isFetching = true;
            await this.$store.dispatch("searchDiscussions", {
                page: "",
                keyword: "",
                category: `${category}`
            });
        }
    },
    mounted() {
        setTimeout(() => {
            this.fetching = false;
        }, 1000);
    },
    async created() {
        try {
            await this.$store.dispatch("fetchAllDiscussions");
            await this.$store.dispatch("fetchPostCategories");
        }
        catch (error) {
            this.$bvToast.toast("Could not fetch data, please refresh this page.", {
                title: "Network Error",
                variant: "danger"
            });
        }
    },
    components: { Loader }
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
}
.cat-tab {
  cursor: pointer;
}
.comm-heading {
  font-size: 26px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fs-7 {
  font-size: 14px;
}
.total-topics.btn {
  border-radius: 90px;
  width: 102px;
  height: 26px;
}
.list-group-item {
  padding: 0;
  border: 0;
  color: rgba(59, 140, 215, 1);
}
.nav.nav-pills a {
  background: transparent;
  &.active {
    border-bottom: 2px solid #119859;
    border-radius: 0;
    color: #119859;
  }
}
.create-discussion {
  background: #f7f7fa;
}
.float-grid {
  position: absolute;
  top: 20px;
  z-index: 20;
  background: white;
  left: 167px;
  padding: 10px;
  box-shadow: -4px 5px 7px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: -4px 5px 7px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -4px 5px 7px rgba(0, 0, 0, 0.1);
}
/* Responsive */
@media screen and (max-width: 500px) {
  .float-grid {
    position: revert !important;
  }
  .comm-heading h1 {
    font-size: 34px;
  }
  .nav.nav-pills {
    flex-direction: row !important;
  }
  .nav.nav-pills a {
    padding: 2px;
    font-size: 12px;
  }
}
</style>