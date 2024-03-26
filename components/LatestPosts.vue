<template>
  <section class="lastest-wrapper">
    <div class="row">
      <div class="col-12">
        <div @click="scrollPrev" class="slide-control prev">
          <img src="~/assets/images/icons/next-btn.png" alt="next button" />
        </div>
        <div>
          <h1>Latest Events</h1>
          <p>
            Catch up with all the lastest event published by different people
            across the country.
          </p>
        </div>
        <div class="d-flex slides-wrap">
          <div ref="slider" class="slide-wrap-inner d-flex">
            <SlideCard
              v-for="latest in events"
              :key="latest.id"
              :event="latest"
              class="mr-2 mr-md-4"
            />
          </div>
        </div>
        <div @click="scrollNext" class="slide-control">
          <img src="~/assets/images/icons/next-btn.png" alt="next button" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "slider",
  data() {
    return {
      right: 0,
      fetching: true
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchAllEvents");
      this.fetching = false;
    } catch (error) {
      console.log(error);
      this.fetching = false;
    }
  },
  computed: {
    events() {
      const events = this.$store.getters["getEvents"];
      const latestFive = events.slice(0, 5);
      return latestFive;
    }
  },
  methods: {
    scrollPrev() {
      let translateScore = this.$refs.slider.style.transform;
      if (translateScore == "translateX(0px)") return;
      this.right += 450;
      console.log("scroll left");
      this.$refs.slider.style.transform = `translateX(${this.right}px)`;
    },
    scrollNext() {
      let translateScore = this.$refs.slider.style.transform;
      if (translateScore == "translateX(-1350px)") return;
      this.right -= 450;
      console.log("scroll right", this.$refs.slider.style.transform);
      this.$refs.slider.style.transform = `translateX(${this.right}px)`;
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-wrap-inner {
  width: 1000px;
  transform: translateX(28px);
  transition: 0.4s all ease-in;
}

.lastest-wrapper {
  padding-left: 168px;
  padding-right: 168px;
  padding-top: 110px;
  padding-bottom: 140px;
  overflow-x: hidden;

  h1 {
    font-weight: 600;
    font-size: 48px;
  }

  p {
    font-weight: 400;
    font-size: 18px;
  }
}

.slides-wrap {
  margin-top: 69px;
  overflow: hidden;
}

.slide-control.prev {
  z-index: 100;
  left: 35px;
  top: 62%;
  transform-origin: left;
  transform: rotate(180deg); /* Use 'rotate' instead of 'rotateZ' */
}

.slide-control {
  z-index: 100;
  position: absolute;
  right: -65px;
  top: 62%;
  cursor: pointer;
}

@media screen and (max-width: 500px) {
  .lastest-wrapper {
    padding-left: 18px;
    padding-right: 18px;
    padding-top: 0;
    margin-top: 30px;
    overflow-x: hidden;

    h1 {
      font-size: 37px;
    }

    p {
      font-size: 16px;
    }

    .slide-control {
      display: none;
    }
  }
}
</style>
