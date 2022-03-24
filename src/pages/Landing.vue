<template>
  <div class="landing_body">
    <div class="header">
      <router-link to="/aboutus" class="link">About the App</router-link>
    </div>
    <div class="main">
      <div class="app_name">NewJot</div>
      <div id="desc">All a student needs in one place</div>
      <base-button :to="$store.getters.isSignedIn ?  '/timetable' : '/login'"><div id="login-text">{{ $store.getters.isSignedIn ? "Go to Timetable" : "Log in"}}</div></base-button>
    </div>
  </div>
</template>

<script>
export default {
  //
};
</script>

<style scoped>

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
  margin-top: 4vh;
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

.app_name {
  text-align: center;
  margin-bottom: 4rem;
  font-size: 60px;
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


    