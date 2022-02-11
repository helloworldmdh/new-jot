<template>
<TheSidebar/>  <!--sidebar component-->
 <div :style="{ marginLeft: sidebarWidth}">
  <router-view></router-view>
 </div>
</template>

<script>
import TheSidebar from './components/Sidebar/TheSidebar.vue';
import { sidebarWidth } from './components/Sidebar/sidebar-state.js';

export default {
  name: 'App',
  components: {
    TheSidebar 
  },
  setup() {
    return {sidebarWidth}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #50432c;
  margin-top: 60px;
}
</style>
