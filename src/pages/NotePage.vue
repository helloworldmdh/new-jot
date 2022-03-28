<template>
  <preview-page 
    :show="previewPageOpen" 
    :title="selectedNote.title" 
    :text="selectedNote.text" 
    :colour="selectedNote.colour"
    @deleteNote="deleteNote"
    @closePreviewPage="closePreviewPage" 
    @editNote="editNote" >
  </preview-page>
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
      <div>
        <p class="note_display">{{ notePreview }}</p>
      </div>
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
        <h3 class="mod_title">Modules</h3>
        <div class="module_cards"  v-for="(mod,index) in uniqueNames" :key="mod">
          <div :style="{'background-color': uniqueNames[index].colour }">
            {{ mod.name }}
            <div v-for="n in notes[index]" :key="n" class="note_details" :style="{'border-color': uniqueNames[index].colour }" @click="selectNote(n, uniqueNames[index].colour)"> {{ n.title }} </div>
           </div>
        </div>
      </div>
      <button class="btn btn-primary" v-if="currentlyEditing" @click="cancelEditing">Cancel Editing</button>
      <div class="note_taking">
        <textarea class="text" v-model="note.text" placeholder="Start typing here.." :style="{ width: computedWidth}" />
        <m-d-guide/>
      </div>
    </div>
  </div>
</template>

<script>
import PlusIcon from '../components/UI/PlusIcon.vue';
import PreviewPage from '../components/Notes/PreviewPage.vue'
import MDGuide from '../components/Notes/MDguide.vue'
import { guideWidth } from '../components/Notes/MDguide.js'

export default {
  name: "NotePage",
  components: {
    PlusIcon,
    PreviewPage,
    MDGuide,
  },
  async mounted () {
    await this.refreshNotes()
    console.log(this.notes);
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
        id: null,
      },
      selectedNote:{},
      dialogBoxShow: false,
      previewPageOpen: false,
      currentlyEditing: false,
    };
  },
  watch:{
    
  },
  computed: {
    notePreview(){
      return this.note.text.length > 200 ? this.note.text.substring(0,200) + "..." : this.note.text;
    },
    computedWidth(){
        var newWidth = 80 - parseInt(guideWidth.value);
        return newWidth;
    }
  },
  methods: {
    openDialogBox(){
      this.dialogBoxShow = true;
    },
    closeDialogBox(){
      this.dialogBoxShow = false;
    },

    editNote() {
      this.closePreviewPage();
      console.log(this.selectedNote)
      this.currentlyEditing = true;
      this.note.text = this.selectedNote.text;
      this.note.id = this.selectedNote.id;
      this.note.title = this.selectedNote.title;
      this.note.moduleID = this.selectedNote.modID;
      this.note.date= this.selectedNote.date;
    },

    cancelEditing() {
      this.resetInputs()
      this.currentlyEditing = false;
      this.note.id = null
    },

    async refreshNotes() {
      await this.$store.dispatch('getModulesFromServer');
      await this.$store.dispatch('getNotes');
      this.modules = this.$store.getters.getterModules;
      this.notes = this.$store.getters.getterNotes;  
      this.sortByModule();
      this.resetInputs();
    },
    
    async sendNote(){
      if (!this.note.moduleID) return alert("please add a module name!");
      if (!this.note.text) return alert("please add some text!");
      if (!this.note.title) return alert("please give the note a title!");
      if (this.note.text.length > 3000) return alert("please ensure the note is under 3000 characters...");

  

      const newnote = {
        modID: this.note.moduleID,
        text: this.note.text,
        title: this.note.title,
        date: this.note.date,
        id: this.note.id
      }
      console.log(newnote)

      await this.$store.dispatch('addNote', newnote).then(async () => {
        this.refreshNotes();
        this.closeDialogBox();
        this.cancelEditing();
      }).catch((error) => {
        console.log(error);
      });

    },

    async deleteNote(){
      await this.$store.dispatch('deleteNote', {
        moduleID: this.selectedNote.modID,
        noteID: this.selectedNote.id,
      });
      this.closePreviewPage();
      this.refreshNotes();
    },
    
    selectNote(note, colour){
      this.selectedNote = Object.assign(note, {colour: colour});
      this.previewPageOpen = true;
    },

    resetInputs(){
      this.note = {
        modules: '',
        text: '',
        title: '',
        date: '',
      }
    },

    sortByModule() {
      const groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
        }, {});
      };
      
      let obj = groupBy(this.notes, 'modID');
      let newArr = [];

      Object.keys(obj).forEach(key => {
        newArr.push(obj[key]);
      });    

      this.notes = newArr;

      this.sortToUniqueNames()
    },

    sortToUniqueNames(){
      this.uniqueNames = [];
      this.notes.forEach(Omod => {
        this.uniqueNames.push({
          name: this.modules.find((mod) => mod.id == Omod[0].modID).name,
          colour: this.modules.find((mod) => mod.id == Omod[0].modID).colour})
      })
    },

    closePreviewPage(){
      this.previewPageOpen = false;
    }, 
  },  
};
</script>

<style scoped>
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
  width:95vw;
  height: 65vh;
}

.module_selection{
  float: left;
  width: 20%;
  height: 90vh;
  margin: 0 0 0;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #0a0053;
}

.mod_title{
  text-align: left;
  padding-left: 1rem;
  padding-bottom:0.4rem;
  border-bottom: 1px solid #0a0053;
  border-top: 1px solid #0a0053;
}

.dialog_content_wrapper label {
  margin:10px;
}

.dialog_content_wrapper input {
  margin-left: 20px;
}

.note_taking{
  float: left;
  border-top: 2px solid #0a0053;
  padding-left: 1rem;
  height: 65vh;
  width: 80%;
} 


.input_color{
  margin-top: 1rem;
  border-radius: 5px;
  right: 2rem;
  padding: 0 0 0;
}

.text{
  border: 0px;
  margin-top: 2rem;
  width: 100%;
  height: 80vh;
  resize: none;
  outline: none;
}
</style>
