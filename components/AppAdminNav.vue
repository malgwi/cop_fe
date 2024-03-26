<template>
  <nav class="navbar py-md-0 navbar-expand-lg navbar-light bg-primary-dark">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse p-2" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto d-flex align-items-center">
          <li class="nav-item mx-3 active">
            <nuxt-link to="/admin/dashboard" class="nav-link text-white"
              >Dashboard <span class="sr-only">(current)</span></nuxt-link
            >
          </li>
          <li class="nav-item mx-3">
            <nuxt-link to="/admin/topics" class="nav-link text-white">Topics</nuxt-link>
          </li>
          <li class="nav-item mx-3">
            <nuxt-link to="/admin/users" class="nav-link text-white">Users</nuxt-link>
          </li>
          <li class="nav-item mx-3">
            <nuxt-link to="/events" class="nav-link text-white">Events</nuxt-link>
          </li>
          <li class="nav-item mx-3">
            <nuxt-link to="/knowledge-repo" class="nav-link text-white">AMR Newsletter</nuxt-link>
          </li>
          <li
            v-if="$route.path === '/' || $route.path === '/auth/sign-up'"
            class="nav-item mx-3"
          >
            <nuxt-link
              to="/auth/login"
              tag="button"
              class="btn nav-btn btn-outline-success my-2 my-sm-0"
              type="submit"
              >Sign in</nuxt-link
            >
          </li>
          <li v-if="$route.path === '/auth/login'" class="nav-item mx-3">
            <nuxt-link
              to="/auth/sign-up"
              tag="button"
              class="btn nav-btn btn-outline-success my-2 my-sm-0"
              type="submit"
              >Sign up</nuxt-link
            >
          </li>
        </ul>
        <!-- @click="isActive = !isActive " -->
        <div v-if="isLoggedIn"  class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex justify-content-center"
            id="dropDownMenu"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="avatar mx-2"></span>
            <span style="line-height:40px;" class="mr-1 text-white">{{user.first_name}}</span>
            <i style="line-height:40px;" class="fa fa-chevron-down"></i>
          </a>
          <div :class="{['d-flex']: isActive}" class="dropdown-menu flex-column align-items-center justify-content-center" aria-labelledby="dropDownMenu">
            <nuxt-link v-if="isAdmin"  to="/admin/dashboard" class="dropdown-item text-center">Dashboard</nuxt-link>
            <a @click="logout" class="dropdown-item text-center" >Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'user-navigation',
  data(){
    return {
      isActive: false
    }
  },
  computed:{
    user(){
      return this.$auth.user
    },
    isLoggedIn(){
      return this.$auth.loggedIn
    },
    isAdmin(){
      if(!this.$auth?.user.account_type) return false
      return this.$auth.user.account_type === 'admin'
    },
  },
  methods:{
    async logout(){
      await this.$auth.logout()
      this.$router.replace('/auth/login')
    }
  }
}
</script>
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
.dropdown-toggle::after {
  display: none !important;
}
.avatar {
  width: 40px;
  height: 40px;
  background: #ddd;
  display: inline-block;
  border-radius: 100%;
}
.bg-primary-dark {
  background: #0d6d40;
}
a.dropdown-item{
  cursor: pointer !important;
}
/* NEW TOUCH */

.nav-btn {
  width: 80px;
  line-height: 16px !important;
}
.search-icon {
  right: 0;
}
.dropdown-toggle::after {
  display: none !important;
}
.avatar {
  width: 40px;
  height: 40px;
  background: #ddd;
  display: inline-block;
  border-radius: 100%;
}
.nav-link{
  font-size: 14px;
}
.dropdown-menu{
    top: 62px;
    left: -31px;
    height: 113px;
    border: 0;
    border-radius: 4px;
    box-shadow: -4px 5px 30px rgba(0, 0, 0, 0.1)  ; 
	-webkit-box-shadow: -4px 5px 30px rgba(0, 0, 0, 0.1)  ; 
	-moz-box-shadow: -4px 5px 30px rgba(0, 0, 0, 0.1)  ; 
}
.nav-link{
  white-space: nowrap !important;
}
/* Responsive */
@media screen and (max-width: 500px) {

}
/* Responsive */
@media screen and (max-width: 500px) {
}

</style>
