<template>
  <plus-icon @plusclicked="openDialogBox"></plus-icon>
  <base-dialog :show="dialogBoxShow" @close="closeDialogBox" title="Note Preview">
    <div class="dialog_content_wrapper">
      <label>Title:</label>
      <input type="text" placeholder="title" v-model="note.title" required/>
      <br>
      <label>Date Created:</label>
      <input type="date" v-model="note.date" required/>
      <br>
      <label>Module Name:</label>
      <select v-model="note.moduleID" required>
        <option v-for="mod in modules" :key="mod.id" :value="mod.id">{{ mod.name }}</option>
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
          <div :style="{'background-color': modules[index].colour }">
            {{ name }}
            <div v-for="n in notes[index]" :key="n" class="note_details" :style="{'border-color': modules[index].colour }" @click="selectNote(this.n)"> {{ n.title }} </div>
           </div>
        </div>
      </div>
      <div class="note_taking">
        <button class="btn btn-primary m-3 btn_one options">U</button>
        <button class="btn btn-primary m-3 btn_two options">I</button>
        <button class="btn btn-primary m-3 btn_three options">B</button>
        <input ref="font_color" type="color" class="input_color options"/><br>
        <textarea class="text" placeholder="Start typing here..." v-model="note.text" @click="toggleColor"></textarea>
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
      modules:[],
      notes: [],
      note:{ 
        moduleID: '',
        text: '',
        title: '',
        date: '',
      },
      dialogBoxShow: false,
    };
  },
  watch:{
    
  },
  computed: {
    notePreview(){
      return this.note.text.length > 200 ? this.note.text.substring(0,200) + "..." : this.note.text;
    },
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
      console.log(this.modules)
      console.log(this.note)
      if (!this.note.moduleID) return alert("please add a module name!");
      if (!this.note.text) return alert("please add some text!");
      if (!this.note.title) return alert("please give the note a title!");
      if (this.note.text.length > 3000) return alert("please ensure the note is under 3000 characters...");

      const newnote = {
        modID: this.note.moduleID,
        text: this.note.text,
        title: this.note.title,
        date: this.note.date,
      }

      await this.$store.dispatch('addNote', newnote).then((result) => {
        console.log(result);
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
				this.modules = result.data.data;
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
        modules: '',
        text: '',
        title: '',
        date: '',
      }
    },

    neatify(){
      // // let unique = [...new Set(this.notes.map(item => item.moduleID))]; // [ 'A', 'B']
      // // this.uniqueNames = unique;

      // const groupBy = function(xs, key) {
      //   return xs.reduce(function(rv, x) {
      //   (rv[x[key]] = rv[x[key]] || []).push(x);
      //   return rv;
      //   }, {});
      // };
      // let obj = groupBy(this.notes, 'moduleID');
      // let newArr = [];

      // Object.keys(obj).forEach(key => {
      //   newArr.push(obj[key]);
      // });    

      // this.notes = newArr;
    },
    // toggleBold(){
    //   document.execCommand('bold');
    // },
    // toggleUnderline(){
    //   this.execCommand("underline");
    // },
    // toggleItalic(){
    //   this.execCommand("italic");
    // },
    // toggleColor(){
    //   this.execCommand("forecolor", false, this.$refs["font_color"]);
    //   console.log( this.$refs["font_color"]);
    // }
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
  width: 20vw;
  height: 80vh;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: var(--accent-one);
}

.title{
  text-align: left;
  margin-left: 1rem;
}

.dialog_content_wrapper label {
  margin:10px;
}

.dialog_content_wrapper input {
  margin-left: 20px;
}

.note_taking{
  border-top: 2px solid var(--accent-one);
  width: 70vw;
  height: 80vh;
} 

.options{
  top: 8rem;
  height: 39px;
  width: 40px;
  position: absolute;
}

.btn_one{
  right: 4rem;
}

.btn_two{
  right: 7rem;
}

.btn_three{
  right: 10rem;
}

.input_color{
  margin-top: 1rem;
  border-radius: 5px;
  right: 2rem;
  padding: 0 0 0;
}

.text {
  border: 0px;
  margin-top: 2rem;
  width: 65vw;
  height: 80vh;
  column-span: 4;
  resize: none;
  padding: 1vh 3vw;
  outline: none;
}
</style>
