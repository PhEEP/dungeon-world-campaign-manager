<template>
  <div id="app">
    <dwcm-nav></dwcm-nav>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import DWCMNav from '@/components/DWCMNav'
export default {
  name: 'app',
  components: {
    'dwcm-nav': DWCMNav
  }
}
</script>

<style>
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
