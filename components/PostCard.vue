<template>
  <div class="card">
    <div class="card-wrap">
      <img
        v-if="discussion.banner"
        :src="discussion.banner"
        class="card-img-top"
        alt="make sense"
      />
      <img
        v-else
        src="~/assets/images/defaultBG.jpg"
        class="card-img-top"
        alt="make sense"
      />
    </div>

    <div class="card-body">
      <div class="d-flex align-items-center">
        <h3 class="card-title">
          <nuxt-link
            :to="`/community/${discussion.id}`"
            class="app-link__text"
            >{{ discussion.title }}</nuxt-link
          >
        </h3>
      </div>
      <p class="card-text summary mt-2">
        {{ truncate(discussion.details, 130) }}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="d-flex align-items-center">
          <div class="img-wrap mr-2 ">
            <img src="~/assets/images/author-img.png" alt="author" />
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-cen"
          >
            <span class="m-0 d-block author">{{
              giveAuthurName(discussion.user.first_name)
            }}</span>
            <span class="duration ml-n2 mt-n1 badge badge-pill">{{
              fromNow(discussion.created_at)
            }}</span>
          </div>
        </div>
        <span class="duration badge badge-pill"
          >{{ discussion.comments_count }} Comments</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Discussion-card",
  props: {
    discussion: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    truncate(content, limit) {
      if (!content) return;
      let summary = content;
      // let summary = this.stripHtml(content)
      if (summary.length > limit)
        return this.stripHtml(summary.slice(0, 127) + "...");
      return this.stripHtml(summary);
    },
    fromNow(date) {
      return moment(`${date}`, "YYYYMMDD").fromNow();
    },
    stripHtml(html) {
      return html.replace(/<[^>]+>/g, "");
    },
    giveAuthurName(name) {
      if (!name) return "Anonymous";
      return name;
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 0 !important;
  box-shadow: -4px 5px 7px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: -4px 5px 7px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -4px 5px 7px rgba(0, 0, 0, 0.1);
}
.card-wrap {
  max-height: 160px;
  overflow: hidden;
}
.card-wrap img {
  width: 100%;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
}
.spacer {
  border: 1px solid #dedede;
  background: #dedede;
  width: 15px;
  height: 0;
}
.summary {
  font-size: 12px;
  color: #000000;
}
.duration {
  font-size: 13px;
  font-weight: 600;
  color: #0000004d;
}
.img-wrap {
  height: 28px;
  width: 28px;
  border-radius: 100%;
  overflow: hidden;
}
.author {
  font-weight: 500;
  font-size: 14px;
}
</style>
