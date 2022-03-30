<template>
  <base-card>Settings</base-card>
  <base-dialog :colour="moduleInEdit.colour" :show="editing" @close="closeEdit" :title="'Editing Module: '+moduleInEdit.name">
    <div class="dialog_container" ref="dialog_container">
    <div class="detail_labels">
        <div class="mod_d">Module Name</div>
        <div class="mod_d">Module Colour</div>
        <div class="mod_d">Lecturer</div>
      </div>
    <div><input
      type="text"
      class="input_modname"
      v-model.trim="moduleInEdit.name"
      required
    /><br />
    <input
      type="color"
      class="input_color"
      v-model="moduleInEdit.colour"
      required
    /><br />
    <input
      type="text"
      class="input_lecturer"
      v-model.trim="moduleInEdit.lecturer"
      required
    /><br />
    </div>
    </div>
    <template #actions>
      <button class="btn btn-primary m-3" @click="updateModule">Update</button>
    </template>
  </base-dialog>
  <div class="setting_page">
    <div class="user_details" ref="user_details">
      <div class="user">Email: {{ email }}</div>
      <ul class="user">
        Modules:
        <li class="mod_names" v-for="m in modules" :key="m">
          <div class="modname_item">{{ m.name }}</div> 
          <box-icon class="edit_icon" name='pencil' size="sm" :color="computedAccentColour" animation="tada-hover" @click="edit(m)"></box-icon>
          <box-icon class="edit_icon" name="trash" size="sm" :color="computedAccentColour" animation="tada-hover" @click="deleteModule(m)"></box-icon>
        </li>
      </ul>
      <div class="user">Total Time Studied: {{ timeStudied }} minutes</div>
    </div>
    <div class="option_one"></div>
    <div class="option_two">
      <h3>Delete Account</h3>
      <p>Warning : This action cannot be undone</p>
      <button class="sett_btn del btn btn-primary m-3" @click="toggleWarning">
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
import BaseDialog from '../components/UI/BaseDialog.vue';

export default {
  name: "Settings",
  components: {BaseDialog},
  data() {
    return {
      email: "",
      modules: [],
      timeStudied: 0,
      moduleInEdit:{},
      warning: false,
      editing: false,
    };
  },
  async created() {
    await this.updateSettingsPage();
    const auth = getAuth(app);
    this.email = auth.currentUser.email
  },
    
  methods: {
    async deleteAccount() {
      const functions = getFunctions(app, 'europe-west2');
      const deleteUserInfo = httpsCallable(functions, 'deleteUserInfo');

      let loader = this.$loading.show({
        loader: 'dots',
        contianer: this.$refs["dialog_container"],
        canCancel: false,
      });

      await deleteUserInfo().then(() => {
        this.$router.replace('/');
      }).catch((error)=>{
        alert(error.message);
      });

      loader.hide();
    },
    toggleWarning() {
      this.warning = !this.warning;
    },
    edit(mod) {
      this.editing = true;
      this.moduleInEdit = JSON.parse(JSON.stringify(mod));
    },
    async closeEdit() {
      this.editing = false;
      await this.$store.dispatch("getModulesFromServer");
      this.modules = this.$store.getters.getterModules;
    },
    async updateModule() {
      console.log(this.moduleInEdit)
      let loader = this.$loading.show({
        loader: 'dots',
        contianer: this.$refs["user_details"],
        canCancel: false,
      });
      await this.$store.dispatch('addModule', {
        id: this.moduleInEdit.id,
        moduleName: this.moduleInEdit.name,
        colour: this.moduleInEdit.colour,
        lecturer: this.moduleInEdit.lecturer,
      }).then(async () => {
        this.editing = false;
        await this.$store.dispatch("getModulesFromServer");
        this.modules = this.$store.getters.getterModules;
      })
      loader.hide();
    },
    async deleteModule(mod){
      let loader = this.$loading.show({
        loader: 'dots',
        contianer: this.$refs["user_details"],
        canCancel: false,
      });
      await this.$store.dispatch('deleteModule', mod.id);
      loader.hide();
      this.updateSettingsPage();
    },
    async updateSettingsPage(){
      let loader = this.$loading.show({
        loader: 'dots',
        contianer: this.$refs["dialog_container"],
        canCancel: false,
      });

      await this.$store.dispatch("getModulesFromServer");
      await this.$store.dispatch("getTotalTime");
      this.modules = this.$store.getters.getterModules;
      this.timeStudied = this.$store.getters.getterTotalTime;

      loader.hide();
    },
  },
};
</script>

<style scoped>
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

.edit_icon{
  display:inline-block;
  margin-left: var(--normal-font-size);
}

.user {
  margin-top: 0.5rem;
  padding-left: 0rem;
}

.mod_names {
  width: 25rem;
  margin-left: 6rem;
  text-decoration: none;
  list-style-type: none;
}

.dialog_container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.mod_d{
  margin: 0.3em 0 0.85em;
}

.input_modname,
.input_lecturer{
  margin: 0.2rem 0 0.2rem;
  width: 15rem;
}

.input_color{
  margin-top: 0.25rem;
  width: 7.5rem;
}

.modname_item{
  margin-top: 0.5rem;
  display: inline-block;
  width: 15rem;
  overflow: hidden;
  white-space: nowrap;
}

.sett_btn {
  height: 54px;
  width: 14rem;
  position: absolute;
  margin: 0.5em;
  border-width: 2px;
}

.pass {
  right: var(--normal-font-size);
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
  padding: var(--normal-font-size);
}
</style>