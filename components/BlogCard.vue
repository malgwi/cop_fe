<template>
  <div class="card position-relative">
    <button
      @click="deleteRepo(repoId)"
      v-if="isAdmin"
      style="top:10px; right:10px;"
      class="btn btn-danger btn-sm text-white position-absolute"
    >
      <b-spinner v-if="deleting" label="Large Spinner" small></b-spinner>
      <span v-else>X</span>
    </button>
    <img
      v-if="thumbnail"
      :src="thumbnail"
      class="card-img-top"
      alt="make sense"
    />
    <img
      v-else
      src="~/assets/images/amr.jpg"
      class="card-img-top"
      alt="make sense"
    />
    <div class="card-body ">
      <div class="d-flex align-items-center">
        <!-- <h5 class="card-title text-primary m-0">AMR/AMU</h5> -->
        <!-- <span class="spacer mx-2"></span>
        <span class="duration">5min Read</span> -->
      </div>
      <p class="card-text summary mt-2">
        {{ title }}
      </p>
      <p>
        <b-icon
          icon="calendar"
          class="mr-2"
          style="color: green;">
        </b-icon>
        <b>{{ formattedPublishDate }}</b>
      </p>
      <a :href="file" target="_blank" class="card-link">
        Read More
      </a>
    </div>
    <ul class="list-group list-group-flush">
      <!-- <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="img-wrap ">
          <img src="~/assets/images/author-img.png" alt="author" />
        </div>
        <span class="duration badge badge-pill">2 Days ago</span>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    repoId: {
      type: Number,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    publish_date: {
      type: Date,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    thumbnail: {
      type: String,
      default: ""
    },
    file: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      deleting: false
    };
  },
  computed: {

    // A computed property to format the publish_date
    formattedPublishDate() {
      if (this.publish_date) {
        const options = { year: 'numeric', month: 'long' };
        return new Date(this.publish_date).toLocaleString('en-US', options);
      }
    },

    isAdmin() {
      if (!this.$auth?.user) return false;
      return this.$auth.user.account_type === "admin";
    }
  },
  methods: {
    async deleteRepo(id) {
      console.log(id);
      this.deleting = true;
      try {
        await this.$axios.$delete(`/admin/knowledge-repo/${id}`);
        this.$bvToast.toast("AMR Newsletter deleted successfully", {
          title: "AMR Newsletter deleted",
          variant: "sucess"
        });
        
        this.$emit('deletedRepo')
        this.deleting = false;

      } catch (error) {
        console.log(error);
        this.$bvToast.toast("Repository could not be deleted.", {
          title: "Unsuccessful",
          variant: "danger"
        });
        this.deleting = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 0 !important;
}
.card-title.text-primary {
  font-size: 13px;
  font-weight: 600;
}
.spacer {
  border: 1px solid #dedede;
  background: #dedede;
  width: 15px;
  height: 0;
}
.summary {
  font-size: 18px;
  color: #000000;
}
.duration {
  font-size: 13px;
  font-weight: 600;
  color: #0000004d;
}
.img-wrap {
  height: 28px;
  width: 28px;
  border-radius: 100%;
  overflow: hidden;
}
</style>
