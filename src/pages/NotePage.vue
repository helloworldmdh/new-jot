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
      <select v-model="modName" required>
        <option v-for="mod in module_names" :key="mod" :value="mod.name">{{ mod.name }}</option>
      </select>
      <br>
      <label>Note: {{modName}}</label>
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
            <div v-for="n in notes[index]" :key="n" class="note_details"> {{ n.text }} </div>
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
    await this.getNotes();
    await this.getModules();   
    this.neatify();
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
      modName: "",
      newModule: {
        name: '',
        color: '',
        lecturer: '',
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
    modName(name){
      this.newModule.name = name;
      this.note.module_name = name;
    },
  },

  methods: {
    openDialogBox(){
      this.dialogBoxShow = true;
    },
    closeDialogBox(){
      this.dialogBoxShow = false;
    },
    async sendNote(){
      if (!this.note.module_name) {
        alert("please add a module name!");
        return;
      }

      if (!this.note.text) {
        alert("please add some text!");
        return;
      }

      if (!this.note.title){
        alert("please give the note a title!");
        return;
      }

      if (this.note.text.length > 3000) {
        alert("please ensure the note is under 3000 characters...");
        return;
      }

      const date = new Date();
      const newnote = {
        module_name: this.note.module_name,
        text: this.note.text,
        title: this.note.title,
        date_created: date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate(),
      }

      await this.getModules().then(async () => {
        if (this.module_names) {
          var exists = !!this.module_names.find(mod => mod.name == this.newModules.name);
          console.log(exists)
          if (!exists) {
            await this.addModule();
          }
        } else {
          await this.addModule();
        }
      })

      const functions = getFunctions(app);
      const postNote = httpsCallable(functions, 'postNote');
      await postNote(newnote).then((result) => {
        console.log(result);
        this.getNotes();
        this.closeDialogBox();
      }).catch((error) => {
        console.log(error);
      });
    },
    
    async getModules() {
			const functions = getFunctions(app);
			const getModules = httpsCallable(functions, 'getModules')
			await getModules().then((result) => {
				this.module_names = result.data.data;
			})
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

    async addModule() {
			const functions = getFunctions(app);
			const addModule = httpsCallable(functions, 'addModule');
			await addModule(this.newModule).then((result) => {
				// Read result of the Cloud Function.
				// /** @type {any} */
				console.log(result);
			}).catch((error) => {
				console.log(error);
			});
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
}

.note_details {
  padding: 0.5em;
  margin: 0.2em;
  border: solid;
  border-color: green;
  border-width: 2px;
  border-radius: 5px;
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
