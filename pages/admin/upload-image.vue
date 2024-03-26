<template>
  <div>
    <div class="container mt-5 pb-4">
      <div class="create-post__wrapper">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="heading-sm"></h1>
          <button
            type="button"
            @click.prevent="$router.back()"
            style="width:132px;"
            class="btn post-disc-btn btn-primary mt-md-3"
          >
            Back
          </button>
        </div>
        <h1 class="intro text-center">Upload Image</h1>
        <!-- <div class="mt-5 d-flex justify-content-between align-items-center">
          <span
                class="text-danger error-feedback"
                v-if="$v.post.banner.$error"
                >Please upload an image</span
              >
        </div> -->
        <form ref="postForm" @submit.prevent="submitPost">
          <div class="col-sm-6 p-0 form-group mx-auto my-2">
            <div
              class="flex-column d-flex justify-content-center align-items-center"
            >
              <!-- <label for="">Enter Image Caption</label> -->
              <input
                type="text"
                class="form-control"
                placeholder="Enter Image Caption"
                v-model="post.caption"
              />
            </div>
          </div>
          <div class="col-md-12 p-0 col-12 form-group">
            <!-- <label for="">Post banner</label> -->
            <div
              class="banner-select form-control flex-column d-flex justify-content-center align-items-center"
            >
              <input
                ref="imgUpload"
                @change="setImage"
                class="d-none"
                type="file"
                accept="image/*"
              />
              <div @click="uploadImg" class="add-img">
                <img src="~/assets/images/icons/add-image-icon.png" alt="add" />
              </div>
              <p v-if="!hasImage" class="mt-2 mb-0">Add post attachment</p>
              <p v-if="hasImage" class="mt-2 mb-0">Replace banner</p>
              <span
                class="text-danger error-feedback"
                v-if="$v.post.banner.$error"
                >Please upload an image</span
              >
            </div>
          </div>
          <div class="col-md-4 mx-auto col-12 d-flex align-items-center">
            <button class="btn btn-block post-disc-btn btn-primary mt-md-3">
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
      uploading: false,
      post: {
        caption: "",
        banner: null
      },
      hasImage: false
    };
  },
  validations: {
    post: {
      caption: { required },
      banner: { required }
    }
  },
  methods: {
    updateContent(content) {
      this.post.details = content;
    },
    async submitPost() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.uploading = true;
      const fd = new FormData();
      fd.set("image", this.post.banner);
      fd.set("title", this.post.caption);
      try {
        await this.$axios.$post("/admin/gallery", fd);
        this.$bvToast.toast("Image uploaded successfully", {
          title: "Image upload",
          variant: "success"
        });
        this.resetForm();
        document.querySelector(".banner-select").style.backgroundImage = ``;
        this.$refs.postForm.reset();
      } catch (error) {
        this.$bvToast.toast("Image upload failed", {
          title: "Unsuccessful",
          variant: "danger"
        });
      } finally {
        this.uploading = false;
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
      this.post.banner = null;
      this.post.caption = "";
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
  width: 511px;
  height: 341px;
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
@media screen and (max-width: 600px) {
  .banner-select {
    width: 100% !important;
  }
}
</style>