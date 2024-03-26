<template>
  <div>
    <div class="container mt-5 pb-4">
      <div class="create-post__wrapper">
        <h1 class="heading-sm">Support communities</h1>
        <div class="mt-5">
          <h1 class="intro">Start a new conversation</h1>
        </div>

        <form ref="postForm" @submit.prevent="submitPost">
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

          <div class="col-md-12 p-0 col-12 form-group">
            <label for="">Post banner</label>
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
              <p v-if="!hasImage" class="mt-2 mb-0">Add post attachment</p>
              <p v-if="hasImage" class="mt-2 mb-0">Replace banner</p>
              <span
                class="text-danger error-feedback"
                v-if="$v.post.banner.$error"
                >Please upload an image</span
              >
              <img ref="preview" class="preview" src="" alt="">
            </div>
          </div>

          <div class="mt-5">
            <h3 class="detail-heading webster">Details</h3>
            <div>
              <TextEditor @editorContent="updateContent($event)" />
              <span
                class="text-danger error-feedback"
                v-if="$v.post.details.$error"
                >Post content cannot be empty or less than 20 words</span
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
              <div class="col-md-5 col-12">
                <div class="form-group">
                  <label for="categories">Tags</label>
                  <span class="direction">
                    <i class="fa fa-info-circle text-info"></i>
                    Use space key <i class="fa fa-keyboard-o text-info"></i> or
                    "<strong class="text-info"></strong>," to create a tag after
                    typing the name</span
                  >
                  <input-tag
                    placeholder="Add tags"
                    class="form-control pl-2"
                    :add-tag-on-keys="[188, 32]"
                    v-model="post.tags"
                  ></input-tag>
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.post.tags.$error"
                    >Please give add tags to post</span
                  >
                </div>
              </div>
              <div class="col-md-4 col-12 d-flex align-items-center">
                <div>
                  <button class="btn post-disc-btn btn-primary mt-md-3">
                    Post discussion
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
  layout: "user",
  middleware:'auth-user',
  mixins: [validationMixin],
  data() {
    return {
      post: {
        title: "",
        banner: null,
        details: "",
        category_id: "1",
        tags: []
      },
      hasImage: false
    };
  },
  validations: {
    post: {
      title: { required },
      banner: { required },
      details: { required, minLength:minLength(100) },
      category_id: { required },
      tags: { required }
    }
  },
  computed: {
    categories() {
      return this.$store.getters["getPostCategories"];
    }
  },
  mounted(){
    this.$v.post.details.$touch() 
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
      this.post.details = content;
    },
    async submitPost() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const fd = new FormData()
      fd.set('title', this.post.title)
      fd.set('banner', this.post.banner)
      fd.set('category_id', this.post.category_id)
      fd.set('tags', this.post.tags.join())
      fd.set('details', this.post.details)
      try {
        await this.$axios.post("/user/discussion", fd )
        this.$bvToast.toast('Post created successfully', {
          title: 'Post Created', 
          variant: 'success'
        })
        this.resetForm()
        this.$refs.postForm.reset()
      } catch (error) {
        this.$bvToast.toast('Post was not submitted',{
          title:  'Unsuccessful', 
          variant: 'danger'
        })
      }
    },
    setImage(file) {
      this.hasImage = true;
      this.post.banner =  file.target.files[0]
    },
    uploadImg() {
      this.$refs.imgUpload.click();
    },
    resetForm(){
      this.post.title = ""
      this.post.details = ""
      this.post.banner = null
      this.post.tags = []
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
.error-feedback{
  font-size: 12px;
}
</style>
