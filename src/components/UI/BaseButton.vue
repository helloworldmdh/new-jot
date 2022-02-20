<template>
    <router-link :to="location" class="button">
        <slot />
    </router-link>
</template>

<script>
export default {
    props: ['location'],
}
</script>

<style scoped>
.button {
  display: block;
  width: 40%;
  height: 60px;
  vertical-align: sub;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  transform: translatez(0);
  text-decoration: none;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: normal;
  box-shadow: 0 9px 18px rgba(0,0,0,0.2);
  border-radius:8px;
  color: black;
  font-weight:600;
}
</style>