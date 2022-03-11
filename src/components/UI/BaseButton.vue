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
  width: 20em;
  height: 60px;
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
  background-color: var(--main-color);
  color: white;
  font-weight:600;
}

.button:hover{
    transform: scale(1.05);
    transition: .3s;
}
</style>