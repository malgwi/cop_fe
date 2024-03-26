<template>
  <div>
    <div class="container mt-5 pb-4">
      <div class="create-manuscript__wrapper">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="heading-sm">Manuscript</h1>
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
          <h1 class="intro">Create Manuscript</h1>
        </div>

        <form ref="post-title">
          <h3 class="title-heading">Title</h3>
          <div class="form-group required">
            <input
              v-model="title"
              type="text"
              class="form-control p-4"
              placeholder="Please Enter Title"
              />
              <span
              class="text-danger error-feedback"
              v-if="$v.title.$error"
              >Please Enter title</span>
          </div>

          <h3 class="title-heading">Author/Contributor Name</h3>
          <div class="form-group required">
            <input
              v-model="author_name"
              type="text"
              class="form-control p-4"
              placeholder="Enter Author name"
              />
              <span
                class="text-danger error-feedback"
                v-if="$v.author_name.$error"
                >Please enter Author name</span>
          </div>

          <h3 class="title-heading">Publication Date</h3>
          <div class="form-group required">
            <input
              v-model="publication_date"
              type="date"
              class="form-control p-4"
              placeholder="Enter Publication date"
              />
              <span
                class="text-danger error-feedback"
                v-if="$v.publication_date.$error"
                >Please enter Publication Date</span>
          </div>

          <h3 class="title-heading">URL</h3>
          <div class="form-group required">
            <input
              v-model="url"
              type="text"
              class="form-control p-4"
              placeholder="Please Enter A URL http://"
            />
            <span 
            class="text-danger error-feedback"
            v-if="$v.url.$error"
              >Please Enter A URL</span
            >
          </div>

          <h3 class="title-heading">File</h3>
          <div>
            <input
            type="file"
            class="p-4"
            @change="setImage($event, false)"
            placeholder="Upload file"
            name="file"
            accept="application/pdf. application/vnd.ms-excel"
          />
          </div>
          

          <button @click.prevent="submitForm" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
export default {
  name: "admin-create-post",
  layout: "user",
  mixins: [validationMixin],
  data(){
    return{
      title: "",
      url: "",
      author_name: "",
      repoExtFile: null,
      publication_date: ""
    };
  },
  validations:{
    title: {required},
    url: {required},
    author_name: {required},
    publication_date: {required}
  },
  methods: {
    async submitForm(){
      this.$v.$touch();
      if(this.$v.$invalid) {
        return;
      }

      const isoDate = new Date(this.publication_date).toISOString();


      this.uploading = true;
      const fd = new FormData();
      fd.set("title", this.title);
      fd.set("url", this.url);
      fd.set("file", this.repoExtFile);
      fd.set("publication_date", isoDate);
      fd.set("author_name", this.author_name);

      console.log(this.post)
      try{
        await this.$axios.post("/admin/manuscript", fd);
        this.$bvToast.toast("Manuscript created successfully", {
          title: "Manuscrip created",
          variant: "success"
        });
        this.uploading = false;
      } catch (error) {
        this.uploading = false;
        this.$bvToast.toast("Manuscript was not submitted", {
          title: "unsuccesful",
          variant: "danger"
        });
      }
      },
      resetForm() {
        this.title = "",
        this.publication_date = "",
        this.author_name = "",
        this.repoExtFile = "",
        this.url = ""
      }
    }
  }


</script>