<template>
    <div class="card position-relative">
      <button
      @click="deleteManuscript(manuId)"
      v-if="isAdmin"
      style="top:10px; right: 10px;"
      class="btn btn-danger btn-sm text-white position-absolute"
      >
      <b-spinner v-if="deleting" label="Large Spinner" small></b-spinner>
      <span v-else>X</span>
      </button>
      <div class="card-body">
        <p class="card-text summary mt-2">
          {{ title }}
        </p>

        <p>
          <b-icon icon="people" class="mr-2" style="color: green;"></b-icon> <b>{{ author_name }}</b>
        </p>

        <p>
        <b-icon 
          icon="calendar" 
          class="mr-2" 
          style="color: green;">
        </b-icon> 
        <b>{{ formattedPublicationDate }}</b> 
      </p>
      
        <a :href="url" target="_blank" class="card-link">
          Read More
        </a>
      </div>
      <ul class="list-group list-group-flush">
      </ul>
    </div>
  </template>

  <script>
  export default {
    props: {
      manuId: {
        type: Number,
        default: ""
      },
      title: {
        type: String,
        default: ""
      },
      url: {
        type: String,
        default: ""
      },
      author_name: {
        type: String,
        default: ""
      },
      publication_date: {
        type: Date,
        default: ""
      }
    },
    data(){
      return{
        deleting: false
      };
    },
    computed: {

      formattedPublicationDate(){
        if(this.publication_date) {
          const options = {year: 'numeric', month: 'long'};
          return new Date(this.publication_date).toLocaleString('en-US', options);
        }
      },

      isAdmin() {
        if (!this.$auth?.user) return false;
        return this.$auth.user.account_type === "admin";
      }
    },
    methods: {
      async deleteManuscript(id) {
        console.log(id);
        this.deleting = true;
        try {
          await this.$axios.$delete(`/admin/manuscript/${id}`);
          this.$bvToast.toast("Manuscript deleted successfully", {
            title: "Manuscript Deleted",
            variant: "success"
          });
          this.$emit('deletedManuscript')
          this.deleting = false;

        } catch (error) {
          console.log(error);
          this.$bvToast.toast("Manuscript could not be deleted.", {
            title: "Unssuccessful",
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
  