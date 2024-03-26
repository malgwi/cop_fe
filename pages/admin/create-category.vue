<template>
  <div>
    <div class="container mt-5 pb-4">
      <div class="create-post__wrapper">
        <div class="mt-5">
          <h1 class="intro">Create a new category</h1>
        </div>

        <form ref="postForm" @submit.prevent="submitPost">
          <div class="mt-5">
            <div class="post-title">
              <!-- <h3 class="title-heading">Name</h3> -->
              <div class="form-group required">
                <input
                  v-model="category.name"
                  type="text"
                  class="form-control p-4"
                  placeholder="Enter category name"
                />
                <span
                  class="text-danger error-feedback"
                  v-if="$v.category.name.$error"
                  >Please enter category name</span
                >
              </div>
            </div>
          </div>
          <div class="">
            <div class="d-flex justify-content-between">
              <button
                type="button"
                @click.prevent="$router.back()"
                style="width:132px;"
                class="btn post-disc-btn btn-primary mt-md-3"
              >
                Back
              </button>
              <button class="btn post-disc-btn btn-primary mt-md-3">
                <b-spinner v-if="createtingCat" style="opacity: 0.5;" label="Large Spinner" small></b-spinner>
                <span v-else>Create category</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="create-post__wrapper mt-5">
        <h3>Category List</h3>
        <b-spinner v-if="fetchingCate" style="opacity: 0.5;" label="Large Spinner" small></b-spinner>

        <div v-else class="d-flex flex-column">
          <div v-for="cat in allCategories" :key="cat.name" >
            <EditableItem @fetchCategory="fetchCategories" :categoryDetails="cat" :editValue="cat.name" />
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>
      {{categories}}
    </pre> -->
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
import EditableItem from "~/components/admin/EditableItem.vue";
export default {
  name: "admin-create-category",
  layout: "admin",
  mixins: [validationMixin],
  data() {
    return {
      category: {
        name: ""
      },
      currentCatEdit: "",
      createtingCat: false,
      fetchingCate: true,
      allCategories: [],
    };
  },
  validations: {
    category: {
      name: { required }
    }
  },
  computed: {
    categories() {
      return this.$store.getters["getPostCategories"];
    }
  },
  mounted() {
    // this.$v.post.details.$touch();
  },
  async created() {
    this.fetchCategories()
    // try {
    //   await this.$store.dispatch("fetchPostCategories");
    //   this.fetchingCate = false
    // } catch (error) {
    //   console.log(error);
    // }
  },
  methods: {
    async fetchCategories(){
      try {
        const response = await this.$axios.$get("/misc/categories");
        this.allCategories = response.data
        this.fetchingCate = false
      } catch (error) {

      }
    },
    updateContent(content) {
      this.post.details = content;
    },
    async submitPost() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.createtingCat = true
      try {
        await this.$axios.post("/admin/category", this.category);
        this.$bvToast.toast("Category created successfully", {
          title: "Category Created",
          variant: "success"
        });
        await this.fetchCategories()
        this.resetForm();
        this.$refs.postForm.reset();
      } catch (error) {
        this.$bvToast.toast("Category was not submitted", {
          title: "Unsuccessful",
          variant: "danger"
        });
      }finally {
        this.createtingCat = false
      }
    },
    setImage(file) {
      this.hasImage = true;
      this.post.banner = file.target.files[0];
    },
    uploadImg() {
      this.$refs.imgUpload.click();
    },
    resetForm() {
      this.category.title = "";
    }
  },
  components: { EditableItem }
};
</script>

<style scoped>
.create-post__wrapper {
  max-width: 500px;
  margin: 0 auto;
}
.heading-sm {
  font-weight: 500;
  font-size: 26px;
}
.intro,
.title-heading {
  font-family: Merriweather;
}
@media screen and (max-width: 500px) {
  .create-post__wrapper {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
  .heading-sm {
    font-size: 16px;
  }
  .intro {
    font-size: 28px;
  }
  .title-heading {
    font-size: 24px;
  }
  .detail-heading {
    font-family: Merriweather;
  }
}
.ql-toolbar.ql-snow {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
}
.ql-editor {
  height: 500px !important;
}
.btn.post-disc-btn.btn-primary {
  border-radius: 25px;
}
.direction {
  font-size: 10px;
}
.banner-select {
  width: 100%;
  height: 130px;
}
.submit-event {
  border-radius: 25px;
}
.add-img {
  cursor: pointer;
}
img.img-preview {
  width: 50px;
  height: 50px;
}
.error-feedback {
  font-size: 12px;
}
</style>
