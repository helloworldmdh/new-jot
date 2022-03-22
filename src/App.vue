<template>
<TheSidebar v-if="page"/>  <!--sidebar component-->
 <div :style="{ marginLeft: computedLeftMargin}" class="router_view">
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
  created(){
    const email = localStorage.getItem('userEmail');
    const pass = localStorage.getItem('password');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 10000) {
      return;
    }

    this.$store.state.authTimer = setTimeout(() => {
      this.$store.dispatch('logout');
    }, expiresIn)

    if (email && pass) {
      this.$store.dispatch('submitLogin', {email: email, password: pass});
    }

    this.$router.replace('/');
  },

  setup() {
    return { sidebarWidth }
  },
  computed:{
    page(){
      if (this.$route.path === '/login' || this.$route.path === '/aboutus' || this.$route.path === '/')
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
</style>
