<template>
  <div class="main_about">
    <div class="header">
      <h1 class="about_main-title">About the App</h1>
    </div>
    <div class="about_body">
      <span class="about_description">
        NewJot strives to provide students a means to organise all their
        educational needs in one place.
      </span>

      <div class="about_container">
        <div :key="card.id" v-for="card in cards">
          <about-card :title="card.title" :list="card.list" />
        </div>
      </div>

      <div class="about_description bottom">
        <div class="bottom">Join now to ease your life as a student!</div>
        <base-button :to="$store.getters.isSignedIn ?  '/timetable' : '/login'" class="login_button"><div id="login-text">{{ $store.getters.isSignedIn ? "Go to Timetable" : "Sign Up"}}</div></base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import AboutCard from "../components/About/AboutCard";

export default {
  name: "AboutUs",
  components: {
    AboutCard,
  },
  data() {
    return {
      cards: [
        {
          id: "1",
          title: "Timetable",
          list: [
            "Customisable",
            "Easy view of the entire day",
            "Accounts for events taking place at the same time",
          ],
        },
        {
          id: "2",
          title: "Timer",
          list: [
            "Optimised for the Pomodoro Method",
            "Simple Use",
            "Track Progress by looking at the time spent studying in the past 30 days",
          ],
        },
        {
          id: "3",
          title: "Note Taking",
          list: [
            "Simple note-taking feature",
            "Easy storage and access of notes",
          ],
        },
      ],
    };
  },
};
</script>

<style>

.main_about {
  background: url(../assets/img/landing.jpg) no-repeat;
  height: 100vh;
  background-size: auto auto;
  color: #14142c;
}

.about_body {
  padding: 3rem 3rem;
  background-color: white;
}

.header {
  background-color: var(--accent-one);
  color: white;
  padding-top: 1.5rem;
  height: 5rem;
  width: 100%;
  box-shadow: 0px 2px 10px rgb(151, 151, 151);
}

.about_main-title {
  font-size: 36px;
}

.about_description {
  display: block;
  font-size: 28px;
  text-align: center;
  margin: 2rem 1rem 2rem;
}

.about_container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
}

.about_box {
  margin: 0 0.25rem;
}

.about_title {
  text-align: center;
  font-size: 24px;
  border-radius: 0.5rem;
  box-shadow: 1px 0px 5px 1px #aaaaaa;
  cursor: default;
}

.bottom {
  margin-bottom: 2rem;
}

#login-text {
  margin-top: 12px;
}

.login_button {
  display: block;
  background-color: var(--main-color);
  width: 15%;
}

.about_subtitle {
  height: 15rem;
  text-align: left;
  font-size: 24px;
  font-weight: 500;
  transition: 0.5s;
  overflow: hidden;
}

/* .about_features{
  
} */

.about_feature {
  margin-bottom: 0.5rem;
}

.about_features {
  transition: 0.5s;
}
</style>