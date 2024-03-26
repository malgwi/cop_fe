<template>
  <div v-if="content" class="topic-detail__wrap p-2 p-md-4 ">
    <h1 class="topic-heading">
      {{ content.title }}
    </h1>
    <div class="my-4">
      <img
        class="topic-img"
        src="~/assets/images/icons/topic-icon.png"
        alt="topic img"
      />
      <span class="webster topic-img__text ml-2"
        >{{ content.user.first_name }} {{ content.user.last_name }}</span
      >
    </div>
    <div v-html="content.details" class="webster topic-content"></div>

    <div class="my-3 extras d-flex justify-content-start align-items-center">
      <!-- <span class="badge badge-pill webster green-pill p-2">230 Replies</span> -->
      <span class="badge badge-pill webster green-pill p-2 ml-2"
        >{{new Date(`${content.created_at}`).toDateString('en-US')}}</span
      >
      <span
        @click="flagPost"
        class="badge badge-pill webster red-pill p-2 ml-2"
      >
        <img class="mr-1" src="~/assets/images/icons/flag.png" alt="" /> Flag
        post</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "post-detail",
  props: {
    content: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    flagPost() {
      this.$emit("flagPost");
    }
  }
};
</script>

<style scoped>
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
  cursor: pointer;
  background: #1198592c;
  width: 100px;
  height: 35px;
  line-height: 17px;
  font-weight: 100;
}
.red-pill {
  cursor: pointer;
  font-weight: 100;
  background: #eb575738;
  width: 100px;
  height: 35px;
  line-height: 17px;
}
</style>
