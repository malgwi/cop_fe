<template>
  <div>
    <div class="container mt-5 pb-5">
      <div class="row">
        <div class="col-12">
          <h3 class="">Add New Event</h3>
          <h1 class="heading mt-md-4">Tell us about your event</h1>
        </div>
      </div>
      <div class="mt-3">
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="submit">
              <div class="row">
                <div class="col-md-6 col-12 form-group">
                  <label for="">Title</label>
                  <input
                    v-model="event.title"
                    type="text"
                    class="form-control"
                    placeholder="Type in your event title here"
                  />
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.title.$error"
                    >Please enter title</span
                  >
                </div>
                <div class="col-md-6 col-12 form-group">
                  <label for="">Event date</label>
                  <input
                    v-model="event.event_date"
                    type="date"
                    class="form-control"
                    placeholder="Enter your event date here"
                  />
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.event_date.$error"
                    >Please enter event date</span
                  >
                </div>
                <div class="col-md-6 col-12 form-group">
                  <label for="">Start time</label>
                  <input
                    v-model="event.start_time"
                    type="time"
                    class="form-control"
                    placeholder="Enter your event date here"
                  />
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.start_time.$error"
                    >Please enter event start time</span
                  >
                </div>
                <!-- <div class="col-md-6 col-12 form-group">
                  <label for="">End time</label>
                  <input
                    v-model="event.end_time"
                    type="time"
                    class="form-control"
                    placeholder="Enter your event date here"
                  />
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.end_time.$error"
                    >Please enter event end time</span
                  >
                </div> -->
                <div class="col-md-6 col-12 form-group">
                  <label for="">Your organization</label>
                  <input
                    v-model="event.organization"
                    type="text"
                    class="form-control"
                    placeholder="Please enter organization"
                  />
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.organization.$error"
                    >Please enter organization</span
                  >
                </div>
                <!-- <div class="col-md-6 col-12 form-group">
                  <label for="">Category</label>
                  <select
                    v-model="event.event_category_id"
                    class="form-control"
                  >
                    <option value="">Select category</option>
                    <option
                      v-for="category in eventCategories"
                      :value="category.id"
                      :key="category.id"
                      >{{ category.name }}</option
                    >
                  </select>
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.event_category_id.$error"
                    >Please select a category</span>
                </div> -->
                <div class="col-md-6 col-12 form-group">
                  <label for="">State</label>
                  <select
                    v-model="event.state"
                    class="form-control"
                  >
                    <!-- <option value="">Select State</option> -->
                    <option
                      v-for="category in nigeriaState"
                      :value="category"
                      :key="category"
                      >{{ category }}</option
                    >
                  </select>
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.state.$error"
                    >Please select a category</span
                  >
                </div>
                <!-- <div class="col-md-6 col-12 form-group">
                  <label for="">Your Name</label>
                  <input
                    v-model="event.name"
                    type="text"
                    class="form-control"
                    placeholder="Enter your name"
                  />
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.name.$error"
                    >Please enter event name</span
                  >
                </div> -->
                <div class="col-md-6 col-12 form-group">
                  <label for="">Your Email</label>
                  <input
                    v-model="event.email"
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                  />
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.email.$error"
                    >Email is required</span
                  >
                </div>
                <div class="col-md-12 col-12 form-group">
                  <label for="">Event description</label>
                  <textarea
                    v-model="event.description"
                    class="form-control"
                    id="description"
                    rows="4"
                  ></textarea>
                  <span
                    class="text-danger error-feedback"
                    v-if="$v.event.description.$error"
                    >Please enter </span
                  >
                </div>

                <div class="col-md-6 col-12 form-group">
                  <label for="">Website Information</label>
                  <input
                    v-model="event.website"
                    type="web"
                    class="form-control"
                    placeholder="Enter website address here"
                  />
                </div>
                <div class="col-md-6 col-12 form-group">
                  <label for="">Contact for more information</label>
                  <input
                    v-model="event.more_info"
                    type="phone"
                    class="form-control"
                    placeholder="Enter your contact information here"
                  />
                  
                </div>

                <div class="col-md-12 col-12 form-group">
                  <label for="">Event banner</label>
                  <div
                    class="banner-select form-control flex-column d-flex justify-content-center align-items-center"
                  >
                    <image-uploader
                      class="d-none"
                      ref="imgUpload"
                      :maxWidth="500"
                      :preview="false"
                      capture="environment"
                      :debug="1"
                      :autoRotate="true"
                      outputFormat="string"
                      @input="setImage"
                    >
                    
                    </image-uploader>
                    <input
                      ref="imgUpload"
                      @change="setImage"
                      class="d-none"
                      type="file"
                    />
                    <div @click="uploadImg" class="add-img">
                      <img
                        src="~/assets/images/icons/add-image-icon.png"
                        alt="add"
                      />
                    </div>
                    <p v-if="!hasImage" class="mt-2 mb-0">
                      Add event attachment
                    </p>
                    <p v-if="hasImage" class="mt-2 mb-0">Replace banner</p>
                  </div>
                </div>
                <div class="col-md-12 d-md-flex justify-content-end">
                  <button
                    :disabled="isSubmitting"
                    class="btn-primary btn submit-event"
                  >
                    <b-spinner
                      v-if="isSubmitting"
                      type="grow"
                      small
                      class="mr-2"
                    ></b-spinner>
                    <span v-if="!isSubmitting">Submit Event</span>
                  </button>
                </div>
              </div>
            </form>
            <AlertMsg ref="alertMsg" :variant="msgType" :message="message" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {stateList} from "../helpers/nigeria_states";
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
export default {
  layout: "user",
  middleware: "auth-user",
  mixins: [validationMixin],
  data() {
    return {
      event: {
        title: "",
        event_category_id: "1",
        event_date: "",
        start_time: "",
        end_time: "",
        name: "",
        email: "",
        organization: "",
        description: "",
        banner: "",
        website: "",
        more_info: ""
      },
      isLoaded: false,
      isSubmitting: false,
      hasImage: false,
      msgType: "success",
      message: "",
      nigeriaState: stateList,
    };
  },
  validations: {
    event: {
      title: { required },
      // event_category_id: { },
      event_date: { required },
      start_time: { required },
      end_time: { required },
      name: { required },
      email: { required },
      organization: { required },
      description: { required },
      banner: { required },
      website: { required },
      more_info: { required },
      state: {required}
    }
  },
  computed: {
    eventCategories() {
      return this.$store.getters["getEventCategories"];
    }
  },
  async created() {
    this.$store.dispatch("fetchEventCategories");
  },
  methods: {
    makeToast(message, title, variant = null) {
      this.$bvToast.toast(message, {
        title: ` ${title}`,
        variant: variant,
        solid: true
      });
    },
    setImage(file) {
      this.hasImage = true;
      this.event.banner = file.target.files[0];
      console.log(this.event.banner);
    },
    uploadImg() {
      this.$refs.imgUpload.click();
      // this.$refs.imgUpload.$el.querySelector("input").click();
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.isSubmitting = true;
      let message = "Event created successfully";
      let variant = "success";
      let title = "Post Created";
      console.log(this.event)
      const fd = new FormData();
      Object.entries(this.event).forEach(([name,val]) => {
        fd.append(name, val)
      })

      try {
        await this.$store.dispatch("uploadEvent", fd);
        this.makeToast(message, title, variant);
        this.isSubmitting = false;
        this.$v.event.$reset();
      } catch (error) {
        this.isSubmitting = true;
        message = "Process failed, please try again";
        variant = "danger";
        title = "Post Not Successful";
        console.log(error);
        this.isSubmitting = false;
        this.makeToast(message, title, variant);
      }
    }
  }
};
</script>

<style scoped>
.heading {
  font-family: Merriweather;
  font-weight: 600;
  font-size: 40px;
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
</style>
