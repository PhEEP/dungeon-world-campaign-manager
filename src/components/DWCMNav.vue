<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="https://placehold.it/150x40?text=DWCM" alt="">
        </div>
      </div>
      <div class="navbar-menu" v-bind:class="{'is-active': showMenu}">
        <div class="navbar-end">
          <div class="navbar-item">
            <a href="#" class="navbar-link">Log Out</a>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'dwcm-nav',
  data () {
    return {
      showMenu: false
    }
  }
}
</script>

<style>

</style>
