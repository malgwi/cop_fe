<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <span>
      {{ title }}
    </span>
    <svg viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#138750"
      ></path>
    </svg>
    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <div v-for="(item, i) in items" :key="i" class="menu-item">
          <span @click="itemClick(item)">{{ item }}</span>

          <span v-for="(text, index) in demo" :key="index">
            <span v-if="item === text.state"> ({{ text.count }}) </span>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: ["title", "items", "events"],
  data() {
    return {
      isOpen: false,
      demo: []
    };
  },
  mounted() {
    this.numberOfEvents();
  },
  methods: {
    numberOfEvents() {
      const counted = Object.entries(
        this.events.reduce(
          (acc, event) => (
            (acc[event.state] = (acc[event.state] || 0) + 1), acc
          ),
          {}
        )
      ).map(([event, count]) =>
        count > 0 ? { count: count, state: event } : ""
      );
      console.log(counted);
      this.demo = counted;
    },
    itemClick(e) {
      this.$emit("itemClick", e);
    }
  }
};
</script>

<style>
.menu-item svg {
  width: 10px;
  margin-left: 10px;
}
.menu-item .sub-menu {
  position: absolute;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 25%;
  gap: 2rem;
  color: #138750;
  border-radius: 8px;
  border: 0.2px solid #138750;
  padding: 1rem;
  background-color: #fff;
  top: calc(100% + 18px);
  left: 50%;
  transform: translateX(-50%);
  /* width: max-content; */
  /* border-radius: 0px 0px 16px 16px; */
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  z-index: 999999;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
