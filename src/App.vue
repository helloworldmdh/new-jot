<template>
<TheSidebar v-if="page"/>  <!--sidebar component-->
 <div :style="{ marginLeft: computedLeftMargin}" class="router_view">
  <router-view></router-view>
 </div>
</template>

<script>
import TheSidebar from './components/Sidebar/TheSidebar.vue';
import { sidebarWidth } from './components/Sidebar/sidebar-state.js';
// import app from './api/firebase.js';
// import { getAuth } from 'firebase/auth';

export default {
  name: 'App',
  components: {
    TheSidebar 
  },
  setup() {
    return { sidebarWidth }
  },
  beforeMount(){
    this.$store.dispatch('logUser');
  },
  computed:{
    page(){
      if (this.$route.path === '/login' || this.$route.path === '/aboutus' || this.$route.path === '/notfound' || this.$route.path === '/')
      {
        return false;
      }
      return true;
    },
    computedLeftMargin(){
      if (!this.page){
        return "0px";
      }
      else {
        return sidebarWidth.value;
      }
    }
  },
  methods: {
  },

  
}
</script>

<style>
#app {
  font-family: var(--main-font);
  text-align: center;
  color: #50432c;
}

.router_view{
  margin-left: 0px;
  transition: .3s;
}

[v-cloak] {
  display: none;
}
</style>
