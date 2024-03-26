<template>
  <div>
    <div class="container mt-5 pb-4">
      <div class="create-post__wrapper">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="heading-sm">Knowledge Repository</h1>
          <!-- <pre>
            {{
              knowledgeRepo
            }}
          </pre> -->
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
          <h1 class="intro">Edit Repository</h1>
        </div>

        <form ref="postForm" @submit.prevent="submitPost">
          <div class="col-md-12 p-0 col-12 form-group">
            <!-- <label for="">Thumbnail</label> -->
            <div
              class="banner-select form-control flex-column d-flex justify-content-center align-items-center"
            >
              <input
                ref="imgUpload"
                @change="setImage"
                class="d-none"
                type="file"
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

          <div class="mt-5">
            <h3 class="detail-heading webster">description</h3>
            <div>
              <TextEditor ref="textEditor" @editorContent="updateContent($event)" />
              <span
                class="text-danger error-feedback"
                v-if="$v.post.description.$error"
                >Post content cannot be empty or less than 20 words</span
              >
            </div>
            <div class="row mt-5">
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
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
export default {
  name: "admin-create-post",
  layout: "admin",
  mixins: [validationMixin],
  data() {
    return {
      post: {
        title: "", //Issue of Covid-19 in nigeria
        banner: null,
        description: "",
        category_id: "1",
        tags: ["Babies", "Mother Care"]
      },
      hasImage: false,
      uploading: false,
      knowledgeRepo: null,
    };

  },
  validations: {
    post: {
      title: { required, minLength: minLength(5) },
      banner: { required },
      description: { required, minLength: minLength(20) },
      // category_id: {  },
      // tags: { required }
    }
  },
  async created() {
    await this.fetchRepo()
  },
  methods: {
    async fetchRepo() {
      const id = this.$route.params.id
      try {
        const resp = await this.$axios.$get(
          "/community/knowledge-repo?limit=5"
        );
        this.knowledgeRepo = resp.data.find(repo => repo.id === Number(id))
        this.post = {...this.post, ...this.knowledgeRepo}
        this.$refs.textEditor.content = this.knowledgeRepo.description
        this.post.banner = this.knowledgeRepo.thumbnail
        document.querySelector(
            ".banner-select"
          ).style.backgroundImage = `url(${this.knowledgeRepo.thumbnail})`;

      } catch (error) {
        this.$bvToast.toast("Could not fetch data", {
          title: "Network Error",
          variant: "danger"
        });
      }
    },
    updateContent(content) {
      this.post.description = content;
    },
    async submitPost() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.uploading = true
      const fd = new FormData();
      fd.set("title", this.post.title);
      fd.set("thumbnail", this.post.banner);
      fd.set("file", this.post.banner);
      // fd.set('category_id', this.post.category_id)
      // fd.set('tags', this.post.tags.join())
      fd.set("description", this.post.description);
      try {
        await this.$axios.post("/admin/knowledge-repo", fd);
        this.$bvToast.toast("Repository created successfully", {
          title: "Repository Created",
          variant: "success"
        });
        this.uploading = false
        // this.resetForm()
        // this.$refs.postForm.reset()
      } catch (error) {
        this.uploading = false
        this.$bvToast.toast("Repository was not submitted", {
          title: "Unsuccessful",
          variant: "danger"
        });
      }
    },
    setImage(file) {
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
        this.post.banner = file.target.files[0];
      } catch (error) {
        console.log(error);
      }
      // console.log(file.target.files[0]);
      this.hasImage = true;
      this.post.banner = file.target.files[0];
    },
    uploadImg() {
      this.$refs.imgUpload.click();
    },
    resetForm() {
      this.post.title = "";
      this.post.description = "";
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
