<template>
 <div class="sidebar" :style="{ width: sidebarWidth }"> <!--binded style based on sidebarCollapsed-->
   <span class="arrow" @click="toggleSidebar" :class="{'flip': !sidebarCollapsed}">  <!--toggles sidebar && flips icon when clicked-->
      <box-icon name='chevron-right' size='lg' color='white' /> <!--flips icon if sidebar expanded-->
  </span>

     <h1>
     <span v-if="!sidebarCollapsed">
      <h1 class="title">NewJot<br></h1>   <!--title when sidebar expands-->

      <SidebarLink id="icon-style" to="/timetable"><box-icon name='calendar' size='lg' color='white' /></SidebarLink>
      <SidebarLink id="icon-style" to="/timer"> <box-icon name='time-five' size='lg' color='white' /></SidebarLink>
      <SidebarLink id="icon-style" to="/notes"><box-icon name='notepad' size='lg' color='white' /></SidebarLink>

      <SidebarLink id="bottom-icon" to="/settings"><box-icon name='cog' size='lg' color='white' /></SidebarLink>
      <SidebarLink id="bottom-icon" to="/"><box-icon name='log-out-circle' size='lg' color='white' /></SidebarLink>
     </span>
   </h1>
 </div>
</template>


<script>
import { sidebarCollapsed, toggleSidebar, sidebarWidth } from './sidebar-state'
import SidebarLink from './SidebarLink.vue'
import 'boxicons';

export default {
  name: 'TheSidebar',
  props: {},
  components: { SidebarLink },
  setup() {  /*declares reactive states */
    return { sidebarCollapsed, toggleSidebar, sidebarWidth } //
  },
  methods: {
   
  }

}
</script>

<style scoped>
.sidebar {
  color:#838383;
  background-color: #d4d4d4;

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
  margin-bottom: 1em;
  margin-top: 1.3em;
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

#icon-style{
  margin-bottom: 1.5em;
  text-decoration: none;
}

#bottom-icon {
  position: relative;
  bottom: 2%;
  top: 15%;
  padding: 0em;
  margin-bottom: 1rem;
}
</style>