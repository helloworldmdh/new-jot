<template>
  <base-card>Settings</base-card>
  <div class="setting_page">
    <div class="user_details">
      <div class="user">Email: {{ email }}</div>
      <ul class="user">
        Modules:
        <li class="mod_names" v-for="m in modules" :key="m">
          {{ m.name }}
        </li>
      </ul>
      <div class="user">Total Time Studied: {{ timeStudied }} minutes</div>
      <button class="sett_btn pass">Change Password</button>
    </div>
    <div class="option_one"></div>
    <div class="option_two">
      <h3>Delete Account</h3>
      <p>Warning : This cannot be undone</p>
      <button class="sett_btn del" @click="toggleWarning">
        Delete account
      </button>
    </div>
    <div class="backdrop" v-if="warning">
      <dialog open v-if="warning">
        <header>Are you sure?</header>
        <button @click="deleteAccount" class="btn btn-primary m-3">
          Delete
        </button>
        <button @click="toggleWarning" class="btn btn-primary m-3">
          Cancel
        </button>
      </dialog>
    </div>
  </div>
</template>

<script>
import app from "../api/firebase";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from 'firebase/functions';

export default {
  mounted() {
    const auth = getAuth(app);
    this.email = auth.currentUser.email;
  },
  name: "Settings",
  components: {},
  data() {
    return {
      email: "",
      modules: [],
      timeStudied: 0,
      warning: false,
    };
  },
  async created() {
    await this.$store.dispatch("getModulesFromServer");
    await this.$store.dispatch("getTotalTime");
    this.modules = this.$store.getters.getterModules;
    this.timeStudied = this.$store.getters.getterTotalTime;
  },
  methods: {
    async deleteAccount() {
      const functions = getFunctions(app);
      const deleteUserInfo = httpsCallable(functions, 'deleteUserInfo');
      await deleteUserInfo();
    },
    toggleWarning() {
      this.warning = !this.warning;
    },
  },
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
  margin-top: 0.5rem;
  padding-left: 0rem;
}

.mod_names {
  margin-left: 6rem;
  text-decoration: none;
}

.sett_btn {
  position: absolute;
  margin: 0.5em;
  border-width: 2px;
  border-color: #6867a1;
  background-color: #f8f8f8;
}

.pass {
  right: 1rem;
  bottom: 1.5rem;
}

.del {
  right: 1.2rem;
}

.option_two {
  position: relative;
  display: block;
  text-align: left;
  width: 80%;
  margin: 2rem auto 2rem auto;
  padding-top: 2rem;
  height: auto;
  border-top-style: solid;
  border-top-color: var(--main-color);
  border-top-width: 4px;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: absolute;
  left: 30%;
  right: auto;
  top: 30vh;
  width: 40%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #5fccff;
  color: white;
  width: 100%;
  padding: 1rem;
}
</style>