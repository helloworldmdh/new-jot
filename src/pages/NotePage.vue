<template>
  <plus-icon @plusclicked="openDialogBox"></plus-icon>
  <base-dialog :show="dialogBoxShow" @close="closeDialogBox" title="Note Preview">
    <div class="dialog_content_wrapper">
      <label>Title:</label>
      <input type="text" placeholder="title" v-model="note.title"/>
      <br>
      <label>Date Created:</label>
      <input type="date" :valueAsDate="currentDate"/>
      <br>
      <label>Module Name:</label>
      <input type="text" placeholder="module name" v-model="note.module_name">
      <br>
      <label>Note:</label>
      <p class="note_display">{{ notePreview }}</p>
    </div>
    <template #actions>
      <div class="actn-btn-wrapper">
        <button class="btn btn-primary" @click="sendNote">Submit</button>
      </div>
    </template>
  </base-dialog>
  <div class="notes_page">
    <base-card> Note Page </base-card>
    <div class="notes_container">
      <div class="module_selection">
        <h3 class="title">Modules</h3>
        <ul class="module_cards" v-for="m in module_names" :key="m">
          {{ m }}
          <li class="note_inst" v-for="note in m" :key="note">
            {{note.title}}
          </li>
        </ul>
      </div>
      <div class="note_taking">
        <textarea class="text" placeholder="Start typing here..." v-model="note.text"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import PlusIcon from '../components/UI/PlusIcon.vue';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../api/firebase.js';

export default {
  name: "NotePage",
  components: {
    PlusIcon,
  },
  async mounted(){
    await this.getNotes();
    console.log(this.notes);
  },

  data() {
    return {
      module_names:[],
      notes: [],
      note:{
        module_name: '',
        text: '',
        title: '',
        date_created: '',
      },
      dialogBoxShow: false,
    };
  },
  computed: {
    currentDate(){
      return new Date();
    },
    notePreview(){
      return this.note.text.length > 200 ? this.note.text.substring(0,200) + "..." : this.note.text;
    }
  },

  watch: {
    notes(orig){
      orig.forEach((note) => {
        this.module_names.push(note.module_name);
      });
    },
  },

  methods: {
    openDialogBox(){
      this.dialogBoxShow = true;
    },
    closeDialogBox(){
      this.dialogBoxShow = false;
    },
    sendNote(){
      const date = new Date();
      const newnote = {
        module_name: this.note.module_name,
        text: this.note.text,
        title: this.note.title,
        date_created: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
      }
      const functions = getFunctions(app);
      const postNote = httpsCallable(functions, 'postNote');
      postNote(newnote).then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    },
    async getNotes(){
      const functions = getFunctions(app);
      const getNotesHttps = httpsCallable(functions, 'getNotes');
      await getNotesHttps().then((result) => {
        this.notes = result.data.data;
      }).catch((error) => {
        console.log(error);
      })
    },
  }
};
</script>

<style>
body {
  text-align: center;
}

.note_display {
  text-align: justify;
  text-align-last: center;
}

.dialog_content_wrapper {
  text-align: left;
}

.actn-btn-wrapper .btn-primary{
  margin-top: 16px;
}

.notes_container {
  column-count: 5;
}

.module_selection{
  width: 20em;
  height: 80vh;
  border-right-width: 2px;
  border-right-color: var(--accent-colour);
}

.title{
  text-align: left;
}

.text {
  column-span: 4;
  width: 80em;
  height: 80vh;
  resize: none;
  border: 0em;
  padding: 2vh 3vw;
  outline: none;
}
</style>
