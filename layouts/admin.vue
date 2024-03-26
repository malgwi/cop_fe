<template>
  <div>
    <div class=" bg-primary py-2">
      <div class="container">
        <nuxt-link to="/" tag="div" class="navbar-brand">
          <img 
          class="ml-3"
          width="130"
          height="50" 
          src="~/assets/images/ncdc-new-logo.png" 
          alt="cop logo" 
          />
        </nuxt-link>
      </div>
    </div>
    <AppAdminNav />
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
