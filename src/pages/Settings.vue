<template>
  <base-card>Settings</base-card>
  <div class="setting_page">
    <div class="user_details">
      <div class="user">Email: {{ email }}</div>
      <!-- <ul class="user">
        Modules:
        <li :v-for="module in modules" v-key="index">
          {{ module }}
        </li>
      </ul> -->
      <div class="user">Total Time Studied: {{ timeStudied }}</div>
      <button class="btn">Change Password</button>
    </div>
    <div class="option"></div>
    <div class="option"></div>
  </div>
</template>

<script>
// import app from "../api/firebase";
// import {
//   getFunctions,
//   httpsCallable,
//   connectFunctionsEmulator,
// } from "firebase/functions";
// import { getAuth } from "firebase/auth";

export default {
  name: 'Settings',
  data() {
    return {
      email: '',
      modules: [],
      timeStudied: 0,
    };
  },
  methods: {
    // fillDetails(){
    //   const functions = getFunctions(app);
    //   if (window.location.hostname === "localhost")
    //   const getTotalTime = httpsCallable(functions, "gettotaltime");
    // }
  }
};
</script>

<style>
.user_details {
  padding: 2rem;
  position: relative;
  display: block;
  text-align: left;
  border-radius: 1em;
  box-shadow: 0px 5px 10px #6867a1;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}

.user {
  margin: 0rem 0rem 0.5rem;
}

.btn {
  display: block;
  justify-content: right;
  margin: 0.5em;
  border-width: 2px;
  border-color: #6867a1;
  background-color: #f8f8f8;
}
</style>