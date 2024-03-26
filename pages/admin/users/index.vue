<template>
  <div>
    <div class="container mt-4">
      <div class=" mb-3 d-flex justify-content-between align-items-center">
        <div>
          <nav aria-label="breadcrumb ">
            <ol class="breadcrumb m-0 p-0">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/dashboard">Home</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Users</li>
            </ol>
          </nav>
          <h3>Users</h3>
        </div>
        <div>
          <button @click="openModal" class="post-btn__lg btn btn-primary">
            Add Admin User
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-end">
            <div class="form-group required  mr-2">
              <input
                class="form-control "
                placeholder="Search username"
                type="text"
              />
            </div>
            <div class="form-group required">
              <select class="form-control sort-select">
                <option class="webster" value="">Status: All</option>
              </select>
            </div>
            <div class="form-group required ml-2">
              <select class="form-control sort-select">
                <option class="webster" value="">Role: All</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <Loader class="h-100" v-if="fetching" size="5" opacity="0.2" />
          <AdminUsersTable :users="allUsers" />
        </div>
        <div v-if="!fetching" class="col-12 pb-5">
          <Pagination :lastPage="last_page" :total="total" />
        </div>
      </div>
    </div>
    <div>
      <b-modal id="modal-1" centered>
        <template #modal-header>
          <div class="d-flex flex-column align-items-center">
            <h3 class="w-100 modal-heading text-center">Add New Admin</h3>
            <p class="text-center heading-text">
              Input the email address of the user you want to maka an Admin
            </p>
          </div>
        </template>
        <div class="px-4 mb-3">
          <form action="">
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailAddress"
              />
              <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
            </div>
            <div class="mt-4">
              <button type="submit" class="btn btn-block btn-primary">
                Add Admin
              </button>
            </div>
          </form>
        </div>
        <template #modal-footer>
          <span></span>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: "auth-admin",
  data() {
    return {
      fetching: true,
      last_page: null,
      total: null
    };
  },
  watch: {
    "$route.query": function() {
      this.fetchAllUsers();
    }
  },
  computed: {
    allUsers() {
      return this.$store.getters["admin/getAllUsers"];
    }
  },
  async created() {
    // try {
    //   await this.$store.dispatch("admin/fetchAllUser");
    // } catch (error) {
    //   console.log(error);
    // }
    this.fetchAllUsers();
  },
  mounted() {
    this.fetching = false;
  },
  methods: {
    openModal() {
      this.$bvModal.show("modal-1");
    },
    async fetchAllUsers() {
      this.fetching = true;
      const page = this.$route.query.page_number;
      try {
        const data = await this.$store.dispatch("admin/fetchAllUser", page);
        // console.log(data);
        this.last_page = data.last_page;
        this.total = data.total;
        this.fetching = false;
      } catch (error) {
        this.$bvToast.toast(
          "Could not fetch users, please check your connection or refresh page.",
          {
            title: "Netwrok Error",
            variant: "danger"
          }
        );
        this.fetching = false;
      }
    }
  }
};
</script>

<style scoped>
.modal-header {
  display: block;
  border-bottom: 0 !important;
}
.modal-footer {
  border-top: 0 !important;
}
.modal-heading {
  font-size: 22px;
  font-weight: 600;
}
.post-btn__lg {
  background: #119859;
  width: 160px;
  height: 42px;
  border-radius: 25px;
}
.breadcrumb {
  background: transparent;
}
.sort-select {
  width: 185px;
  border-radius: 6px;
  height: 40px;
}
</style>
