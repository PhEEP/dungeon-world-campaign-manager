<template>
  <section id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu is-active">
        <div class="navbar-end">
          <router-link to="login">Log In</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
