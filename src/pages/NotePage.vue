<template>
  <preview-page 
    :show="previewPageOpen" 
    :title="selectedNote.title" 
    :text="selectedNote.text" 
    :colour="selectedNote.colour"
    :date="selectedNote.date"
    @deleteNote="deleteNote"
    @closePreviewPage="closePreviewPage" 
    @editNote="editNote" >
  </preview-page>
  <plus-icon @plusclicked="openDialogBox"></plus-icon>
  <base-dialog :show="dialogBoxShow" @close="closeDialogBox" title="Note Preview">
    <div class="dialog_content_wrapper">
      <label>Title:</label>
      <input class="input_note" type="text" placeholder="title" v-model="note.title" required/>
      <br>
      <label>Date Created:</label>
      <input class="input_note" type="date" v-model="note.date" required/>
      <br>
      <label>Module Name:</label>
      <select class="input_note select_mod" v-model="note.modID" required>
        <option v-for="mod in modules" :key="mod.id" :value="mod.id">{{ mod.name }}</option>
      </select>
      <br>
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
      <div class="module_selection" ref="module_selection">
        <h3 class="mod_title">Modules</h3>
        <div class="module_cards"  v-for="(mod,index) in uniqueNames" :key="mod">
          <div :style="{'background-color': uniqueNames[index].colour }">
            <div :style="{'color': getAccentColour(uniqueNames[index].colour)}">{{ mod.name }}</div>
            <div v-for="n in notes[index]" :key="n" class="note_details" :style="{'border-top': '1px solid #04011f'}" @click="selectNote(n, uniqueNames[index].colour)"> {{ n.title }} </div>
           </div>
        </div>
      </div>
      <button class="btn btn-primary" v-if="currentlyEditing" @click="cancelEditing">Cancel Editing</button>
      <div class="note_taking">
        <textarea class="text" v-model="note.text" placeholder="Start typing here.."/>
        <m-d-guide/>
      </div>
    </div>
  </div>
</template>

<script>
import PlusIcon from '../components/UI/PlusIcon.vue';
import PreviewPage from '../components/Notes/PreviewPage.vue'
import MDGuide from '../components/Notes/MDguide.vue'

export default {
  name: "NotePage",
  components: {
    PlusIcon,
    PreviewPage,
    MDGuide,
  },
  async mounted () {
    await this.refreshNotes();
  },
  data() {
    return {
      uniqueNames: [],
      modules:[],
      notes: [],
      note:{ 
        modID: '',
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
    currentDate(){
      return new Date();
    }
  },
  methods: {
    getAccentColour(colour) {
      // Counting the perceptive luminance - human eye favors green color...
      if (colour.length != 7) return "#646464"
      var luminance = (0.299 * this.hexToRgb(colour).r + 0.587 * this.hexToRgb(colour).g + 0.114 * this.hexToRgb(colour).b)/255;
      if (luminance < 0.5)
        return "#ffffff"
      else
        return "#000000"
    },

    dateSetter(event){
      this.note.date = event.target.value;
    },

    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    
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
  
      this.note = JSON.parse(JSON.stringify(this.selectedNote))
      
    },

    cancelEditing() {
      this.refreshNotes();
      this.currentlyEditing = false;
      this.note.id = null
    },

    async refreshNotes() {
      let loader = this.$loading.show({
        loader: 'dots',
        contianer: this.$refs["module_selection"],
        canCancel: false,
      })
      await this.$store.dispatch('getModulesFromServer');
      await this.$store.dispatch('getNotes');
      loader.hide();
      this.modules = this.$store.getters.getterModules;
      this.notes = this.$store.getters.getterNotes;  
      this.sortByModule();
      this.resetInputs();

      let date = new Date();
      date.setDate(date.getDate());
      this.note.date = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    },
    
    async sendNote(){
      if (!this.note.modID) return alert("Please add a module name!");
      if (!this.note.text) return alert("Please add some text!");
      if (!this.note.title) return alert("Please give the note a title!");
      if (this.note.text.length > 3000) return alert("Please ensure the note is under 3000 characters...");  
      let loader = this.$loading.show({
        loader: 'spinner',
        container: this.$refs["dialog_content_wrapper"],
        canCancel: false,
      })

      const newnote = {
        modID: this.note.modID,
        text: this.note.text,
        title: this.note.title,
        date: this.note.date,
        id: this.note.id
      }

      await this.$store.dispatch('addNote', newnote).then(async () => {
        loader.hide();
        this.refreshNotes();
        this.closeDialogBox();
        this.cancelEditing();
      }).catch((error) => {
        console.log(error);
      });

    },

    async deleteNote(){
      await this.$store.dispatch('deleteNote', {
        modID: this.selectedNote.modID,
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
  margin: 1em;
  height: auto;
  border-radius: 5px;
  border: 1px solid #04011f;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: 0 9px 18px rgba(0,0,0,0.2);
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

label{
  width: 12rem;
}

.mod_title{
  text-align: left;
  padding-left: var(--normal-font-size);
  padding-top:0.4rem;
  padding-bottom:0.4rem;
  border-bottom: 2px solid #0a0053;
  border-top: 2px solid #0a0053;
}

.dialog_content_wrapper label {
  margin:10px;
}

.dialog_content_wrapper input {
  margin-left: 20px;
}

.note_taking{
  justify-content: left;
  float: left;
  border-top: 2px solid #0a0053;
  padding-left: var(--normal-font-size);
  height: 65vh;
  width: 80%;
} 

.input_note {
  width: 15rem;
}

.input_color{
  margin-top: var(--normal-font-size);
  border-radius: 5px;
  right: 2rem;
  padding: 0 0 0;
}

.select_mod{
  margin-left: 20px;
}

.text{
  border: 0px;
  margin-top: 2rem;
  width: 75%;
  float:left;
  height: 80vh;
  resize: none;
  outline: none;
}
</style>
