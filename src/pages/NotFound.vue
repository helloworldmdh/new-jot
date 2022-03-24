<template>
<base-card>
  <h1>404: Page not found!</h1>
  <h3>Please try one of our other pages:</h3>
  <ul>
    <li>
      <router-link to="/">Home Page</router-link>
    </li>
    <li>
      <router-link to="/timetable">Timetable Page</router-link>
    </li>
  </ul>
</base-card>
</template>

<script>
export default {

}
</script>

<style scoped>
li {
  display: inline;
  padding-left:10px;
}
</style>