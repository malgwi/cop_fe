<!-- Please remove this file from your project -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <div class="" id="">
        <ul class="navbar-nav mr-auto d-flex align-items-center">
          <li class="nav-item mx-3">
            <nuxt-link to="/contact-us" class="nav-link text-white"
              >Contact Us</nuxt-link
            >
          </li>
          <li class="nav-item mx-3 active">
            <nuxt-link to="/events" class="nav-link text-white"
              >Events <span class="sr-only">(current)</span></nuxt-link
            >
          </li>

          <li class="nav-item mx-3">
            <a class="nav-link text-white">Facebook</a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link text-white">Twitter</a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link text-white">Instagram</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.nav-btn,
.nav-input {
  height: 30px;
}
.nav-btn {
  width: 80px;
  line-height: 2px !important;
}
.search-icon {
  right: 0;
}
</style>
