<template>
  <div class="landing_body">
    <div class="header">
      <router-link to="/aboutus" class="link">About the App</router-link>
    </div>
    <div class="main">
      <h1 class="app-name">NewJot</h1>
      <div id="desc">All a student needs in one place</div>
      <base-button to="/login"><div id="login-text">Log In</div></base-button>
    </div>
  </div>
</template>

<script>
export default {
  //
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.landing_body {
  background: url(../assets/img/landing.jpg) no-repeat;
  height: 100vh;
  background-size: auto auto;
  color: #14142c;
  background-color: #7acff7b0;
}

.main {
  justify-content: center;
  padding: 4rem;
  top: 5vh;
  position: relative;
  display: block;
  border-radius: 1em;
  box-shadow: 0px 5px 10px #6867a1;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  background-color: aliceblue;
}

.header {
  height: 5rem;
  width: 100%;
  background-color: var(--accent-one);
  box-shadow: 0px 2px 10px rgb(151, 151, 151);
}

.link {
  color: white;
  position: fixed;
  font-size: 24px;
  top: 1.25rem;
  right: 2.5rem;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
}

.link:hover {
  text-decoration: underline;
}

.app-name {
  margin-bottom: 4rem;
  font-size: 64px;
}

#desc {
  font-style: italic;
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 5%;
}

#login-text {
  margin-top: 12px;
}
</style> 


    