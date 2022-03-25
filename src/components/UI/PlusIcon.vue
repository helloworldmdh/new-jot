<template>
  <div>
    <a class="floating-btn" @click="$emit('plusclicked')">+</a>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.floating-btn{
  width: 80px;
  height: 80px;
  background: #5ac0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 50%;
  color: #fff;
  font-size: 40px;
  box-shadow:2px 2px 5px rgba(0, 0, 0, 0.25);
  position: fixed;
  right: 20px;
  bottom: 20px;
  transition: background 0.25s;
  z-index: 9;
  cursor: pointer;
}

.floating-btn:active {
  background: #4593b8;
}

</style>