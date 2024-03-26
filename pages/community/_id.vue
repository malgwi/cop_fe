<template>
  <div class="pb-">
    <div class="container mt-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white">
          <li class="breadcrumb-item">
            <nuxt-link to="/community" class="text-primary"
              >COMMUNITY</nuxt-link
            >
          </li>
          <li class="breadcrumb-item">
            <nuxt-link to="/community">{{
              discussion.category.name
            }}</nuxt-link>
          </li>
          <!-- <li class="breadcrumb-item active" aria-current="page">
            <a href="">ANXIEY DISORDER</a>
          </li> -->
        </ol>
      </nav>

      <div class="topic-detail__wrap p-2 p-md-4 ">
        <h1 class="topic-heading">
          {{ discussion.title }}
        </h1>
        <div class="my-4">
          <img
            class="topic-img"
            src="~/assets/images/icons/topic-icon.png"
            alt="topic img"
          />
          <span class="webster topic-img__text ml-2">{{
            userName(discussion.user)
          }}</span>
        </div>
        <div v-html="discussion.details" class="webster topic-content">
          <!-- {{discussion.details}} -->
        </div>

        <div
          class="my-3 extras d-flex justify-content-start align-items-center"
        >
          <span class="badge badge-pill webster green-pill p-2"
            >{{ discussion.comments_count }} Replies</span
          >
          <span class="badge badge-pill webster green-pill p-2 ml-2">{{
            dateFormat(discussion.created_at)
          }}</span>
          <span class="badge badge-pill webster red-pill p-2 ml-2">
            <img class="mr-1" src="~/assets/images/icons/flag.png" alt="" />
            Flag post</span
          >
        </div>
      </div>

      <div class="my-5">
        <div class="d-flex align-items-center">
          <img src="~/assets/images/icons/profile-pic.png" alt="user" />
          <span class="webster ml-2 username"
            >{{ discussion.user.first_name }}
            {{ discussion.user.last_name }}</span
          >
        </div>
      </div>
      <div>
        <form @submit.prevent="replyPost">
          <TextEditor ref="quill" @editorContent="updateContent($event)" />
          <div
            class="mt-3 d-flex justify-content-center justify-content-md-end align-items-center"
          >
            <button class="btn btn-primary reply-btn">
              <b-spinner
                v-if="isReplying"
                type="grow"
                small
                class="mr-2"
              ></b-spinner>
              <span v-if="!isReplying">Post reply</span>
            </button>
          </div>
        </form>
      </div>
      <div
        class="d-flex mt-5 justify-content-center justify-content-md-end align-items-center"
      >
        <div class="form-group d-flex">
          <label class="flex-shrink-0 mt-1" for="oldest">Sort by</label>
          <select id="oldest" class="ml-2 sort-select form-control sort-input">
            <option selected>Oldest</option>
            <option>Latest</option>
          </select>
        </div>
        <div class="form-group d-flex ml-4">
          <label class="flex-shrink-0 mt-1" for="oldest">Page</label>
          <select id="oldest" class="ml-2 sort-select form-control sort-input">
            <option selected>1/35</option>
            <option>2</option>
          </select>
        </div>
      </div>
      <hr class="hr" />
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="post reply mt-3 p-2"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div class="">
            <img
              class="topic-img"
              src="~/assets/images/icons/topic-icon.png"
              alt="topic img"
            />
            <img
              class="ml-3"
              src="~/assets/images/icons/right-triangle.png"
              alt=""
            />
            <span class="webster topic-img__text ml-2">{{
              comment.user.first_name + " " + comment.user.last_name
            }}</span>
          </div>
          <div>
            <p class="m-0 webster">{{ dateFormat(comment.created_at) }}</p>
          </div>
        </div>
        <div class="mt-4 post-content">
          <div class="user-comment" v-html="comment.message"></div>
          <div class="post-actions d-flex justify-content-end">
            <span class="badge badge-pill webster red-pill p-2"
              ><img
                class="mr-1"
                src="~/assets/images/icons/flag.png"
                alt=""
              />Flag comment</span
            >
          </div>
        </div>
      </div>
    </div>
    <Sponsors class="mt-5" />
  </div>
</template>

<script>
// import {fromNow} from "~/plugins/globalFuncs";
export default {
  layout: "user",
  name: "discussionDetails",
  middleware: "auth-user",
  data() {
    return {
      comments: [],
      replyContent: "",
      isReplying: false
    };
  },
  async fetch() {
    try {
      await this.$store.dispatch("fetchAllDiscussions");
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    discussion() {
      const id = this.$route.params.id;
      const discussions = this.$store.getters["getDiscussions"];
      return discussions.find(disc => disc.id == id);
    }
  },
  mounted() {
    // console.log(this.$refs.quill.content)
    this.fetchComments();
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
    async fetchComments() {
      const discussion_id = this.discussion.id;
      try {
        const resp = await this.$axios.get(
          `/community/comments/${discussion_id}`
        );
        this.comments = resp.data.data;
        // this.$bvToast.toast()
      } catch (error) {
        this.$bvToast.toast(
          "Could not load post, due to netwrok issues. Kindly check connection or refresh this page",
          {
            title: "Network Error",
            variant: "danger"
          }
        );
      }
    },
    async replyPost() {
      this.isReplying = true;
      try {
        await this.$axios.post(`/user/comment/${this.discussion.id}`, {
          message: this.replyContent
        });
        this.isReplying = false;
        this.$refs.quill.content = "";
        await this.$store.dispatch("fetchAllDiscussions");
        this.fetchComments();
      } catch (error) {
        this.isReplying = false;
        this.$bvToast.toast(
          "Could not post reply, please try again.",
          "Reply Unsuccessful",
          "danger"
        );
      }
    },
    updateContent(e) {
      this.replyContent = e;
    }
  }
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
