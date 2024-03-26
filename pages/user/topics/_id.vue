<template>
  <div class="pb-5">
    <div v-if="discussion" class="container mt-5">
      <TopicDetail :content="discussion" />
    </div>
  </div>
</template>

<script>
import TopicDetail from "~/components/user/TopicDetail.vue";
export default {
  layout: "user",
  name: "topic-details",
  middleware: "auth-user",
  components: {
    TopicDetail
  },
  data() {
    return {
      comments: [],
      replyContent: "",
      isReplying: false
      // discussion: {}
    };
  },
  async fetch() {
    try {
      await this.$store.dispatch("user/fetchUserDiscussions");
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    discussion() {
      const id = this.$route.params.id;
      const discussions = this.$store.getters["user/getUserDiscussions"];
      return discussions.find(disc => disc.id == id);
    }
  },
  methods: {
    momentFormat(date) {
      return fromNow(date);
    },
    userName(user) {
      if (!user.first_name || !user.last_name) return "Anonymous";
      return user.first_name + " " + user.last_name;
    },
    dateFormat(date) {
      if (!date) return;
      return new Date(date).toDateString();
    },

    updateContent(e) {
      this.replyContent = e;
    }
  }
  // async created() {
  //   const id = this.$route.params.id;
  //   console.log("ID:", id);
  //   this.discussion = await this.$axios.get(`/community/discussions/${id}`)
  //     .data;
  // },
  // mounted() {
  //   console.log(this.discussion);
  // }
};
</script>

<style>
.post.sub-post {
  background: #f7f7fa;
  border-radius: 6px;
  border: 0.8px solid rgba(32, 32, 32, 0.3);
}
.post.reply {
  background: #f7f7fa;
  border-radius: 6px;
  /* border: 0.8px solid rgba(32, 32, 32, 0.3); */
}
.post-content {
  padding-left: 80px;
}
.post-reply__btn {
  width: 110px;
  height: 40px;
  border-radius: 25px;
}
.hr {
  border-top: 2px solid #ddd;
}
.sort-select {
  width: 110px;
}
.reply-btn {
  border-radius: 25px;
  width: 208px;
  height: 48px;
  line-height: 33px;
}
.username {
  font-weight: 700;
  font-size: 18px;
}
.breadcrumb .breadcrumb-item a {
  color: #3b8cd7 !important;
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
.sort-input {
  border-radius: 25px;
}
.user-comment img {
  width: 100%;
  max-width: 200px;
}
@media screen and (max-width: 500px) {
  .topic-heading {
    line-height: 36px;
    font-size: 32px;
  }
  .topic-img {
    width: 30px;
    height: 30px;
  }
  .post-content {
    padding-left: 44px;
  }
  .post-reply__btn {
    width: 77px;
    height: 33px;
    line-height: 12px;
    border-radius: 25px;
  }
  .post-date {
    font-size: 12px;
  }
}
</style>

<!-- <span class="btn btn-primary webster post-reply__btn bg-primary p-2"
              >Reply</span
            > -->
<!-- <div class="post sub-post p-3 mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div class="">
                <img
                  class="topic-img"
                  src="~/assets/images/icons/topic-icon.png"
                  alt="topic img"
                />              
                <span class="webster topic-img__text ml-2">Soanxious</span>
              </div>
              <div>
                <p class="m-0 webster post-date">Posted May 23, 2021</p>
              </div>
            </div>
            <div class="mt-3 post-content">
              <p>Most days Tracy don't worry u are not alone.</p>
              <div class="post-actions d-flex justify-content-between">
                <span class="badge badge-pill webster red-pill p-2"
                  ><img
                    class="mr-1"
                    src="~/assets/images/icons/flag.png"
                    alt=""
                  />Flag comment</span
                >
                <span
                  class="btn btn-primary webster post-reply__btn bg-primary p-2"
                  >Reply</span
                >
              </div>
            </div>
          </div> -->
