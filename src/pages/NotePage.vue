<template>
  <div>
      <h1> Note Page </h1>
      <textarea class="text"> Start typing here... </textarea>
  </div>
</template>

<script>

export default {
  name:"NotePage",

  components: {
  },
}
</script>

<style>
body{
  text-align: center;
}

.text{
  width: 50vw;
  height: 90vh;
  resize: none;
  border: 0em;
  padding: 2vh 3vw;
  
}

</style>
