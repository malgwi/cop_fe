<template>
  <div class="d-flex justify-content-between my-3">
    <input v-if="editMode" v-model="currentVal" type="text" />
    <p v-else>{{ prevValue }}</p>
    <div>
      <div v-if="!editMode" class="">
        <button :disabled="deletingCat" @click="editMode = true" class="btn btn-primary mr-2">
          Edit
        </button>
        <button :disabled="deletingCat" @click="deleteCategory" class="btn btn-danger mr-2">
          <b-spinner v-if="deletingCat" style="opacity: 0.5;" label="Large Spinner" small></b-spinner>
          <span v-else>Delete</span>
        </button>
      </div>
      <div v-if="editMode">
        <button
          :disabled="updateingCat"
          @click="updateCategory"
          class="btn btn-primary"
        >
        <b-spinner v-if="updateingCat" style="opacity: 0.5;" label="Large Spinner" small></b-spinner>
          <span v-else>Save</span>
        </button>
        <button
          :disabled="updateingCat"
          v-if="editMode"
          @click="editMode = false"
          class="btn btn-danger"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditableComponent",
  props: {
    editValue: {
      type: String,
      default: ""
    },
    categoryDetails: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      editMode: false,
      prevValue: "",
      currentVal: "",
      updateingCat: false,
      deletingCat:false
    };
  },
  mounted() {
    this.prevValue = this.editValue;
    this.currentVal = this.editValue;
  },
  methods: {
    async updateCategory() {
      this.updateingCat = true;
      try {
        await this.$axios.$patch(`/admin/category/${this.categoryDetails.id}`, {
          name: this.currentVal
        });
        this.makeToast("Category update was successful", "Category", "success");
        this.editMode = false;
        this.$emit('fetchCategory')
      } catch (error) {
        this.makeToast("Category update failed", "Category", "danger");
      } finally {
        this.updateingCat = false;
      }
    },
    async deleteCategory() {
      this.deletingCat = true
      try {
        await this.$axios.$delete(`/admin/category/${this.categoryDetails.id}`);
        this.makeToast("Category deleted successfully", "Category", "success");
        this.$emit('fetchCategory')
      } catch (error) {
        this.makeToast("Category removal failed", "Category", "danger");
      }finally {
        this.deletingCat = false
      }
    },
    makeToast(message, title, variant = null) {
      this.$bvToast.toast(message, {
        title: ` ${title}`,
        variant: variant,
        solid: true
      });
    }
  }
};
</script>
