<template>
  <div class="pb- ">
    <CoolLightBox
      :items="items"
      :slideshow="isSlideShow"
      :index="index"
      @close="index = null"
    >
    </CoolLightBox>
    <div class="container mt-5 min-vh-100">
      <div class="d-flex justify-content-between mb-4">
        <div>
          <button class="btn btn-primary" @click="$router.back()">Back</button>
        </div>
        <div v-if="isAdmin">
          <nuxt-link to="/admin/upload-image" class="btn btn-primary"
            >Upload Images</nuxt-link
          >
        </div>
      </div>
      <div class="row">
        <div
          v-for="(img, imageIndex) in allImages"
          :key="img.id"
          class="col-md-4 p-md-3 p-2 light-img "
        >
          <div class="w-100">
            <img class="img" :src="img.url" @click="index = imageIndex" />
            <h4>{{ img.title }}</h4>
            <button
              @click.capture="deleteImg(img, imageIndex)"
              :disabled="deleting"
              title="delete"
              v-if="isAdmin"
              class="mt-2 btn btn-danger"
            >
              <b-spinner
                v-if="deletingIndex === imageIndex"
                label="Large Spinner"
                small
              ></b-spinner>
              <span v-else>Delete</span>
            </button>
            <pre></pre>
          </div>
        </div>
      </div>
      <div class="row mt-5 position-relative">
        <Loader class="h-50" v-if="fetching" size="5" opacity="0.2" />
      </div>

      <!-- Pagination -->
      <div v-if="!fetching" class="col-12 pb-5">
        <Pagination :lastPage="last_page" :total="total" />
      </div>
    </div>
    <!-- image modal -->
    <Sponsors />
  </div>
</template>

<script>
export default {
  // middleware: "auth-user",
  layout: "user",
  watchQuery: true,
  data() {
    return {
      allImages: null,
      isSlideShow: false,
      items: [
        "/img1.jpg",
        "/img2.jpg",
        "/img3.jpg",
        "/img4.jpg",
        "/img5.jpg",
        "/img6.jpg",
        "/img7.jpg"
      ],
      index: null,
      fetching: true,
      deleting: false,
      deletingIndex: -1,
      last_page: null,
      total: null
    };
  },
  // watch: {
  //   "$route.query": function() {
  //     this.fetchAllEvents();
  //   }
  // },
  mounted() {
    this.fetchGallery();
  },
  computed: {
    imagez() {
      // const img = []
      return this.items.map((i, index) => `img${index + 1}`);
    },
    isAdmin() {
      if (!this.$auth?.user) return false;
      return this.$auth.user.account_type === "admin";
    },
    events() {
      return this.$store.getters["getEvents"];
    }
  },
  methods: {
    setImage() {
      return null;
    },
    showModal() {
      this.$bvModal.show("img-modal");
    },
    populateImageItems(imagesData) {
      if (!imagesData) return [];
      const urls = [];
      imagesData.forEach(img => {
        urls.push(img.url);
      });
      this.items = urls;
    },
    async fetchGallery() {
      this.fetching = true;
      try {
        const resp = await this.$axios.$get("/community/gallery");
        this.allImages = resp.data;
        this.populateImageItems(resp.data);
        this.last_page = resp.last_page;
        this.total = resp.total;

        // console.log({
        //   allImages: this.allImages,
        //   populateImageItems: this.populateImageItems,
        //   res: resp
        // });
      } catch (error) {
        console.log(error);
        this.$bvToast.toast(
          "Could not fetch Images, please check your connection or refresh page.",
          {
            title: "Netwrok Error",
            variant: "danger"
          }
        );
      } finally {
        this.fetching = false;
      }
    },
    async deleteImg(img, index) {
      if (!img) return;
      this.index = null;
      this.deleting = true;
      this.deletingIndex = index;

      console.log(this.deletingIndex, "imageIndex", index);

      try {
        await this.$axios.$delete(`/admin/gallery/${img.id}`);
        this.$bvToast.toast("Image deleted successfully", {
          title: "Image Removed",
          variant: "success"
        });
        this.fetchGallery();
        this.deletingIndex = -1;
      } catch (error) {
        this.$bvToast.toast("Image delete was not successful", {
          title: "Image Error",
          variant: "danger"
        });
        this.deletingIndex = -1;
        console.log(error);
      } finally {
        // this.deletingIndex = -1
        this.deleting = false;
      }
    }
  }
};
</script>

<style scoped>
.img {
  max-width: 300px;
  height: 300px;
  width: 100%;
  /* height: 100%; */
  aspect-ratio: 1/1;
}
.cool-lightbox-toolbar__btn:first-child {
  display: none !important;
}
.submit-event {
  border-radius: 25px;
}
.slide-card {
  width: 100% !important;
}

.submit-btn {
  width: 172px;
  height: 39px;
  border-radius: 20px !important;
}
.light-img {
  cursor: pointer;
}
</style>