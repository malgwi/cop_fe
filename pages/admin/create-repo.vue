<template>
  <div>
    <div class="container mt-5 pb-4">
      <div class="create-post__wrapper">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="heading-sm">Newsletter</h1>
          <button
            type="button"
            @click.prevent="$router.back()"
            style="width:132px;"
            class="btn post-disc-btn btn-primary mt-md-3"
          >
            Back
          </button>
        </div>
        <div class="my-5">
          <h1 class="intro">Create a Newsletter</h1>
        </div>

        <form ref="postForm" @submit.prevent="submitPost">
          <div class="col-md-12 p-0 col-12 form-group">
            <!-- <label for="">Thumbnail</label> -->
            <div
              class="banner-select form-control flex-column d-flex justify-content-center align-items-center"
            >
              <input
                ref="imgUpload"
                @change="setImage($event, true)"
                class="d-none"
                type="file"
                name="thumbnail"
              />
              <div @click="uploadImg" class="add-img">
                <img src="~/assets/images/icons/add-image-icon.png" alt="add" />
              </div>
              <p v-if="!hasImage" class="mt-2 mb-0">Add thumbnail</p>
              <p v-if="hasImage" class="mt-2 mb-0">Replace banner</p>
              <span
                class="text-danger error-feedback"
                v-if="$v.post.banner.$error"
                >Please upload an image</span
              >
              <img ref="preview" class="preview" src="" alt="" />
            </div>
          </div>

          <div class="mt-5">
            <div class="mb-3">
              <h3 class="title-heading">File</h3>
              <div class="">
                <input
                  type="file"
                  class=" p-4"
                  @change="setImage($event, false)"
                  placeholder="Type in your post title here"
                  name="file"
                  accept="application/pdf,application/vnd.ms-excel"
                />
                <!-- <span
                  class="text-danger error-feedback"
                  v-if="$v.post.title.$error"
                  >Please enter post title</span
                > -->
              </div>
            </div>
            <div class="post-title">
              <h3 class="title-heading">Title</h3>
              <div class="form-group required">
                <input
                  v-model="post.title"
                  type="text"
                  class="form-control p-4"
                  placeholder="Type in your post title here"
                />
                <span
                  class="text-danger error-feedback"
                  v-if="$v.post.title.$error"
                  >Please enter post title</span
                >
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="publish_date">Publish Date</label>
            <input
              type="date"
              class="form-control"
              id="publish_date"
              v-model="post.publish_date"
              placeholder="Select a date"
            />
            <span
              class="text-danger error-feedback"
              v-if="$v.post.publish_date.$error"
            > Please pick a date </span>
          </div>

          <div class="mt-5">
            <h3 class="detail-heading webster">description</h3>
            <div>
              <TextEditor @editorContent="updateContent($event)" />
              <span
                class="text-danger error-feedback"
                v-if="$v.post.description.$error"
                >Post content cannot be empty</span
              >
            </div>
            <div class="row mt-5">
              <div class="col-md-3 col-12">
                <div class="form-group">
                  <label for="categories">Category</label>
                  <select
                    v-model="post.category_id"
                    id="categories"
                    class="form-control"
                  >
                    <option value="">Select Category</option>
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                      >{{ category.name }}</option
                    >
                  </select>
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.post.category_id.$error"
                    >Please select a category</span
                  >
                </div>
              </div>
              <div class="col-md-12 col-12 d-flex align-items-center">
                <div>
                  <button class="btn post-disc-btn btn-primary mt-md-3">
                    <b-spinner
                      v-if="uploading"
                      style="opacity: 0.5;"
                      label="Large Spinner"
                      small
                    ></b-spinner>
                    <span v-else>
                      Upload
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { category } from "~/helpers/category";
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
import Datepicker from 'vuejs-datepicker';

export default {
  name: "admin-create-post",
  layout: "admin",
  mixins: [validationMixin],
  components:{
    Datepicker
  },
  data() {
    return {
      post: {
        title: "", //Issue of Covid-19 in nigeria
        banner: null,
        repoExtFile: null,
        description: "",
        category_id: "",
        publish_date: "",
        tags: ["Babies", "Mother Care"]
      },
      hasImage: false,
      uploading: false,
      repoCategory: category
    };
  },
  validations: {
    post: {
      title: { required },
      banner: { required },
      description: { required },
      publish_date: { required },
      category_id: { required }
      // tags: { required }
    }
  },
  computed: {
    categories() {
      return this.$store.getters["getPostCategories"];
    }
  },
  mounted() {
    this.$v.post.description.$touch();
  },
  async created() {
    try {
      await this.$store.dispatch("fetchPostCategories");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    updateContent(content) {
      this.post.description = content;
    },
    async submitPost() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const isoDate = new Date(this.post.publish_date).toISOString();

      this.uploading = true;
      const fd = new FormData();
      fd.set("title", this.post.title);
      fd.set("thumbnail", this.post.banner);
      fd.set("file", this.post.repoExtFile);
      fd.set("category_id", this.post.category_id);
      // fd.set('tags', this.post.tags.join())
      fd.set("description", this.post.description);
      fd.set("publish_date", isoDate);
      console.log(this.post);
      try {
        await this.$axios.post("/admin/knowledge-repo", fd);
        this.$bvToast.toast("Repository created successfully", {
          title: "Repository Created",
          variant: "success"
        });
        this.uploading = false;
        // this.resetForm()
        // this.$refs.postForm.reset()
      } catch (error) {
        this.uploading = false;
        this.$bvToast.toast("Repository was not submitted", {
          title: "Unsuccessful",
          variant: "danger"
        });
      }
    },
    setImage(file, isThumbnail) {
      try {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const uploaded_image = reader.result;
          document.querySelector(
            ".banner-select"
          ).style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(file.target.files[0]);
        this.hasImage = true;
        if (isThumbnail) {
          this.post.banner = file.target.files[0];
        } else {
          this.post.repoExtFile = file.target.files[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    uploadImg() {
      this.$refs.imgUpload.click();
    },
    resetForm() {
      this.post.title = "";
      this.post.description = "";
      this.post.publish_date = "",
      this.post.banner = null;
      this.post.tags = [];
    }
  }
};
</script>

<style scoped>
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
  .banner-select {
    width: 100%;
    height: 220px;
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
  width: 348px;
  height: 220px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
