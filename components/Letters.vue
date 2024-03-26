<template>
  <div v-click-outside="onClickOutside" class="letter-grid">
    <!-- <div
      v-for="letter in letters"
      :key="letter"
      @click="active = true"
      :class="[active === true ? 'active text-white': 'bg-secondary']"
      class="letter d-flex justify-content-center align-items-center p-3 rounded-lg "
    >
      {{ letter }}
    </div> -->
    <Letter
      @closeLetters="closeGrid"
      v-for="letter in letters"
      :key="letter"
      :letter="letter"
    />
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
  name: "letters",
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      letters: [],
      active: false
    };
  },
  computed: {
    generatedLetters() {
      let letter, i, a;
      return (a = [...Array(26)].map(_ => String.fromCharCode(i++), (i = 97)));
    }
  },
  mounted() {
    this.letters = this.generatedLetters;
  },
  methods: {
    closeGrid() {
      this.$emit("closeGrid");
    },
    onClickOutside(event) {
      this.closeGrid();
    }
  }
};
</script>

<style scoped>
.letter.active {
  background: #28a745;
}
.letter {
  /* width: 50px;
    height: 50px; */
  text-transform: uppercase;
  cursor: pointer;
}
.letter-grid {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 15px;
}
@media screen and (max-width: 500px) {
  .letter-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
  }
}
</style>
