<template>
 <div class="sidebar" :style="{ width: sidebarWidth }"> <!--binded style based on sidebarCollapsed-->
   <span class="arrow" @click="toggleSidebar" :class="{'flip': !sidebarCollapsed}">  <!--toggles sidebar && flips icon when clicked-->
      <box-icon name='chevron-right' size='lg' color='white' /> <!--flips icon if sidebar expanded-->
  </span>

     <h1>
     <span v-if="!sidebarCollapsed">
      <h1 class="title" :style="{ width: sidebarWidth }">NewJot<br></h1>   <!--title when sidebar expands-->
      <div class="divider" :style="{ width: sidebarWidth }"></div>
      <SidebarLink id="icon-style" to="/timetable"><box-icon name='calendar' size='lg' color='white' /><span class="link_name">Timetable</span></SidebarLink>
      <SidebarLink id="icon-style" to="/timer"> <box-icon name='time-five' size='lg' color='white' /><span class="link_name">Timer</span></SidebarLink>
      <SidebarLink id="icon-style" to="/notes"><box-icon name='notepad' size='lg' color='white' /><span class="link_name">Notes</span></SidebarLink>
      <SidebarLink id="icon-style" to="/settings"><box-icon name='cog' size='lg' color='white' /><span class="link_name">Settings</span></SidebarLink>

      <SidebarLink id="bottom-icon" to="/" @click="logout"><box-icon name='log-out-circle' size='lg' color='white' /><span class="link_name_logout">Logout</span></SidebarLink>
     </span>
   </h1>
 </div>
</template>


<script>
import { sidebarCollapsed, toggleSidebar, sidebarWidth } from './sidebar-state'
import SidebarLink from './SidebarLink.vue'
import 'boxicons';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../api/firebase.js';

export default {
  name: 'TheSidebar',
  props: {},
  components: { SidebarLink },
  setup() {  /*declares reactive states */
    return { sidebarCollapsed, toggleSidebar, sidebarWidth } //
  },
  methods: {
   logout(){
      signOut(getAuth(app)).then(()=>{
        this.$store.dispatch('logUser');
        this.$router.replace("/");
      });
    }
  }

}
</script>

<style scoped>
.sidebar {
  color:#838383;
  background-color: var(--main-color);

  float: left;
  position:fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.4s ease; /* speed of toggle */

  display: flex;
  flex-direction: column;
}

.title{
  color: whitesmoke;
  font-size: var(--h1-font-size);
  width: auto;
  text-align: center;
  margin-left: -7px;
  margin-bottom: .75em;
  margin-top: 1.5em;
  transition: .5s;
}

.divider{
  margin-left: -7px;
  height: .01rem;
  background-color: azure;
  width: 0px;
  margin-bottom: .5em;
}

.arrow {
  margin-top: -0.5em;
  position: absolute;
  transition: 0.3s linear;
}

.flip{
  transform: rotate(180deg);
  transition: 0.3s linear;
}

.link_name{
  display: block;
  font-size: var(--normal-font-size);
  text-align: center;
  margin-bottom: .7em;
  transition: .5s;
  color: white;
}

.link_name_logout{
  display: block;
  font-size: var(--normal-font-size);
  text-align: center;
  margin-bottom: .25em;
  transition: .5s;
  color: white;
}

.link_name:hover, .link_name_logout:hover{
    text-shadow: 2px 2px #7e7caf;
}

#icon-style{
  margin-bottom: 1.2em;
  text-decoration: none;
}

#bottom-icon {
  display: block;
  position: fixed;
  bottom: 0em;
  left: 2.8rem;
  padding: 0em;
  margin-bottom: 1rem;
  text-align: center;
  text-decoration: none;
}
</style>