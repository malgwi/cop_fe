<template>
  <div class="pb-5">
    <div class="container mt-4">
      <div class="mb-4">
        <button type="button" @click.prevent="$router.back()" style="width:132px;" class="btn post-disc-btn btn-primary mt-md-3">
                Back
              </button>
      </div>
      <div class="approval-banner">
        <div
          class="row p-md-5 p-2 d-flex justify-content-around align-items-center"
        >
          <div v-if="blogDetail" class="col-md-6 d-flex justify-content-start">
            <p class="mb-0">Approve this topic to add to listing</p>
          </div>
          <div v-if="blogDetail" class="col-md-6 d-flex justify-content-end">
            <button
              :disabled="isApproving || isDeclining"
              @click="approve(blogDetail.id)"
              :class="[blogDetail.status === 'approved' ? 'd-none' : 'd-flex']"
              class="btn  align-items-center justify-content-center approval-btn bg-primary"
            >
              <span v-if="!isApproving">Approve</span>
              <b-spinner
                v-if="isApproving"
                type="grow"
                small
                class="mr-2"
              ></b-spinner>
              <img
                v-if="!isApproving"
                class="ml-2"
                src="~/assets/images/icons/approve.svg"
                alt="approve"
              />
            </button>
            <button
              @click="decline(blogDetail.id)"
              :disabled="isDeclining || isDeclining"
              class="btn d-flex align-items-center justify-content-center ml-3 approval-btn bg-danger"
            >
              <span v-if="!isDeclining">Decline</span>
              <b-spinner
                v-if="isDeclining"
                type="grow"
                small
                class="mr-2"
              ></b-spinner>
              <img
                v-if="!isDeclining"
                class="ml-2"
                src="~/assets/images/icons/decline.svg"
                alt="decline"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="p-3 my-3"></div>

      <!--  -->
      <div v-if="blogDetail">
        <!-- <pre>{{blogDetail}}</pre> -->
        <PostDetail
          @flagPost="decline(blogDetail.id)"
          :content="blogDetail"
        />
      </div>
      <div
        v-else
        class="w-100 d-flex justify-content-center align-items-center"
      >
        <b-spinner type="grow" small class=" position-absolute"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import TopicDetail from "~/components/user/TopicDetail.vue";
export default {
  layout: "admin",
  watchQuery: ["id"],
  middleware: "auth-admin",
  fetchOnServer: false,
  components:{
    TopicDetail
  },
  // async fetch(e) {
  //   const id = this.$route;
  //   console.log(e, id);
  //   // e.store.dispatch("admin/fetchAllDiscussions", e.from);
  //   this.blogDetail = await e.$axios.$get(`/community/discussions/${id}`);
  // },
  data() {
    return {
      isApproving: false,
      isDeclining: false,
      blogDetail: null
    };
  },
  async created() {
    // this.$store.dispatch("admin/fetchAllDiscussions");
    const id = this.$route.params.id;
    try {
      // this.blogDetail = await this.$axios.get(`/community/discussions/${id}`);
      const {data} = await this.$axios.$get(`/admin/discussions`);
      this.blogDetail = data.find(blog => blog.id == id) || {};
    } catch (error) {
      console.log(error, error.response);
    }
    // this.addCat()
  },

  methods: {
    makeToast(message, title, variant = null) {
      this.$bvToast.toast(message, {
        title: ` ${title}`,
        variant: variant,
        solid: true
      });
    },
    async approve(id) {
      this.isApproving = true;
      try {
        await this.$store.dispatch("admin/approveDiscussion", id);
        this.makeToast(
          "Post approval was successful",
          "Post Approved",
          "success"
        );
        await this.$store.dispatch("admin/fetchAllDiscussions");
        this.isApproving = false;
      } catch (error) {
        this.isApproving = false;
        this.makeToast(
          "Post approval was unsuccessful",
          "Approval Failed",
          "danger"
        );
      }
    },
    async addCat(id) {

      try {
        const catAdd = await this.$axios.$post('/admin/category', {
          name: "Health",
        })
        console.log('CATS:', catAdd)
      } catch (error) {
        this.isDeclining = false;
        this.makeToast(
          "Add category was unsuccessful",
          "Add category",
          "danger"
        );
      }
    },
    async decline(id) {
      this.isDeclining = true;
      try {
        await this.$store.dispatch("admin/declineDiscussion", id);
        this.makeToast(
          "Post declined successfully",
          "Post Delcined",
          "success"
        );
        this.isDeclining = false;
        await this.$store.dispatch("admin/fetchAllDiscussions");
      } catch (error) {
        this.isDeclining = false;
        this.makeToast(
          "Post declined was unsuccessful",
          "Decline Failed",
          "danger"
        );
      }
    },
  }
  // mounted() {
  //   console.log("MOunted", this.blogDetail);
  // }
};
</script>

<style lang="scss" scoped>
.approval-banner {
  background: #f7f7fa;
  border: 0.4px solid rgba(32, 32, 32, 0.3);
  border-radius: 12px;
  /* height: 100px; */
}

.approval-btn {
  width: 200px;
  height: 48px;
  color: #fff;
}

.topic-detail__wrap {
  background: #f7f7fa;
  border-radius: 16px;
}

.topic-heading {
  font-family: Merriweather;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.04em;
  text-align: left;
}

.topic-img {
  width: 50px;
  height: 50px;
}

.topic-img__text {
  font-size: 18px;
  font-weight: 700;
}

.topic-content {
  font-weight: 400;
  font-size: 18px;
}

.green-pill {
  background: #1198592c;
  width: 100px;
  height: 35px;
  line-height: 17px;
  font-weight: 100;
}

.red-pill {
  font-weight: 100;
  background: #eb575738;
  width: 100px;
  height: 35px;
  line-height: 17px;
}

@media screen and (max-width: 500px) { /* Added spaces around `(max-width: 500px)` */
  /* Place your mobile-specific styles here if needed */
}
</style>
