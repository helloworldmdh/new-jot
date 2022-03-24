<template>
  <div class="notes_page">
    <base-card> Note Page </base-card>
    <div class="notes_container">
      <div class="module_selection">
        <h3 class="title">Modules</h3>
        <ul class="module_cards" :v-for="module in modules" v-key="index">
          <li class="note_inst" :v-for="note in notes" v-key="note.date_created">
            {{note.title}}
          </li>
        </ul>
      </div>
      <div class="note_taking">
        <textarea class="text"> Start typing here... </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotePage",
  data() {
    return {
      modules:[],
      notes: [],
      note:{
        module_name: '',
        text: '',
        title: '',
        date_created: '',
      }
    };
  },
};
</script>

<style>
body {
  text-align: center;
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
  text-align: center;
}

.text {
  column-span: 4;
  width: 80em;
  height: 80vh;
  resize: none;
  border: 0em;
  padding: 2vh 3vw;
}
</style>
