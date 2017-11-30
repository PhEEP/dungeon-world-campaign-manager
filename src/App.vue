<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed color="primary" app>
      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        Worlds of Adventure Campaign Manager
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
          :disabled="!item.active"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat @click.prevent="onLogOut" v-if="userIsAuthenticated"><v-icon>exit_to_app</v-icon> Log Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-content>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
      </v-content>
    </main>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :bottom="snackbar.y === 'bottom'"
      :right="snackbar.x === 'right'"
      :left="snackbar.x === 'left'"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      sideNav: false
    }
  },
  methods: {
    onLogOut () {
      this.$store.dispatch('logout')
    },
    closeSnackbar () {
      this.$store.dispatch('setSnackbar', {})
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    snackbar () {
      return this.$store.getters.snackbar
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    menuItems () {
      let menuItems = [
        { icon: 'lock_open', title: 'Sign In', link: '/login', active: true },
        { icon: 'person', title: 'Sign Up', link: '/signup', active: true }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'home', title: 'Home', link: '/hello', active: true },
          { icon: 'book', title: 'Compendium', link: '/compendium', active: true },
          { icon: 'recent_actors', title: 'Characters', link: '/characters', active: true },
          { icon: 'local_library', title: 'Campaigns', link: '/campaigns', active: false }
        ]
      }
      return menuItems
    }
  },
  updated () {
  }
}
</script>

<style>
.ql-toolbar.ql-snow {
  background: #ccc;
}
</style>
