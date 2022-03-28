<template>
  <plus-icon @plusclicked="openDialogBox"></plus-icon>
  <base-dialog :show="dialogBoxShow" @close="closeDialogBox" title="Note Preview">
    <div class="dialog_content_wrapper">
      <label>Title:</label>
      <input type="text" placeholder="title" v-model="note.title" required/>
      <br>
      <label>Date Created:</label>
      <input type="date" :valueAsDate="currentDate" required/>
      <br>
      <label>Module Name:</label>
      <select v-model="note.module_name" required>
        <option v-for="mod in module_names" :key="mod" :value="mod.name">{{ mod.name }}</option>
      </select>
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
        <div class="module_cards"  v-for="(name,index) in uniqueNames" :key="name">
          <div :style="{'background-color': module_names[index].colour }">
            {{ name }}
            <div v-for="n in notes[index]" :key="n" class="note_details" :style="{'border-color': module_names[index].colour }" @click="selectNote(this.n)"> {{ n.title }} </div>
           </div>
        </div>
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
    this.refreshNotes();
  },

  data() {
    return {
      uniqueNames: [],
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

  methods: {
    openDialogBox(){
      this.dialogBoxShow = true;
    },
    closeDialogBox(){
      this.dialogBoxShow = false;
    },

    async refreshNotes() {
      await this.getNotes();
      await this.getModules();   
      this.neatify();
    },

    async sendNote(){
      if (!this.note.module_name) return alert("please add a module name!");
      if (!this.note.text) return alert("please add some text!");
      if (!this.note.title) return alert("please give the note a title!");
      if (this.note.text.length > 3000) return alert("please ensure the note is under 3000 characters...");

      const date = new Date();
      const newnote = {
        module_name: this.note.module_name,
        text: this.note.text,
        title: this.note.title,
        date_created: date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate(),
      }

      const functions = getFunctions(app, 'europe-west2');
      const postNote = httpsCallable(functions, 'postNote');
      await postNote(newnote).then(() => {
        // console.log(result);
        this.getNotes();
        this.closeDialogBox();
      }).catch((error) => {
        console.log(error);
      });

      this.refreshNotes();
      this.resetInputs();
    },
    
    async getModules() {
			const functions = getFunctions(app, 'europe-west2');
			const getModules = httpsCallable(functions, 'getModules')
			await getModules().then((result) => {
				this.module_names = result.data.data;
			})
		},
    
    async getNotes(){
      const functions = getFunctions(app, 'europe-west2');
      const getNotesHttps = httpsCallable(functions, 'getNotes');
      await getNotesHttps().then((result) => {
        this.notes = result.data.data;
        if (!result.data.data) this.notes = [];
      }).catch((error) => {
        console.log(error);
      })
    },

    resetInputs(){
      this.note = {
        module_name: '',
        text: '',
        title: '',
        date_created: '',
      }
    },

    neatify(){
      let unique = [...new Set(this.notes.map(item => item.module_name))]; // [ 'A', 'B']
      this.uniqueNames = unique;

      const groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
        }, {});
      };
      let obj = groupBy(this.notes, 'module_name');
      let newArr = [];

      Object.keys(obj).forEach(key => {
        newArr.push(obj[key]);
      });    

      this.notes = newArr;
    },
  },  

  
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

.module_cards {
  padding: 1em;
  height: auto;
  border-radius: 5px;
}

.note_details {
  padding: 0.5em;
  border: solid;
  border-color: #ffffff;
  border-width: 2px;
  border-radius: 5px;
  background-color: #ffffff;
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
  margin-left: 1rem;
}

.note_taking{
  border-left-style: solid;
  border-left-width: 2px;
  border-left-color: var(--main-colour);
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
