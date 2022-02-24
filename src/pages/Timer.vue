<template>
  <div>
    <div class="header">Timer</div>
    <clock />
  </div>
</template>

<script>
import Clock from "../components/Timer/Clock.vue";

export default {
  name: 'Timer',
  components:{
    Clock
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.header {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px;
    font-weight: 300;
    text-align: center;
    margin-top: 2rem;
} 

</style>