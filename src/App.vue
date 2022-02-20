<template>
<TheSidebar v-if="page"/>  <!--sidebar component-->
 <div :style="{ marginLeft: computedLeftMargin}">
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
    return { sidebarWidth }
  },
  computed:{
    page(){
      if (this.$route.path === '/login' || this.$route.path === '/')
      {
        return false;
      }
      return true;
    },
    computedLeftMargin(){
      if (this.page){
        return "0px";
      }
      else return sidebarWidth;
    }
  },
  methods: {
  },

  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #50432c;
  transition: 0.3s;
}
</style>
