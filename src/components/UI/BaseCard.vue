<template>
  <div>
      <h2><slot>Fallback title</slot></h2>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
div {
  border-radius: 12px;
  box-shadow: 0 9px 18px rgba(0,0,0,0.2);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>