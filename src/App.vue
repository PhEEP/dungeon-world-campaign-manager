<template>
  <div id="app">
    <DWCMNav />
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import DWCMNav from '@/components/DWCMNav'
export default {
  name: 'App',
  components: {
    DWCMNav
  }
}
</script>

<style>
/* #app {
  height:100%;
} */
.main {
  margin-top:7rem;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
