<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <header :style="{'background-color': colour}">
        <slot name="header">
          <h2>{{ title }}</h2>
          <box-icon class="icon_style" name='pencil' size="cssSize" color="white" animation="tada-hover" @click="tryEdit"></box-icon>
          <box-icon class="delete_style" name='trash' size="cssSize" color="white" animation="tada-hover" @click="tryDelete"></box-icon>
        </slot>
      </header>
      <section>
        <div class="text_output" v-html="convertFromMD"></div>
      </section>
    </dialog>
  </teleport>
</template>

<script>
import { marked } from 'marked'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    text:{
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    }
  },
  emits: ['closePreviewPage', 'editNote', 'deleteNote'],
  computed: {
    convertFromMD() {
      return marked(this.text, { breaks: true, smartypants: true});
    }
  },
  methods: {
    tryClose() {
      console.log(this.colour)
      this.$emit('closePreviewPage');
    },
    tryEdit() {
      this.$emit('editNote');
    },
    tryDelete() {
      this.$emit('deleteNote');
    },
  },
};
</script>

<style scoped>
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
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
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
  text-align: center;
  background-color: #5fccff;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

.icon_style{
  position: absolute;
  width: 3rem;
  right: 1rem;
  top: 1rem;
}

.delete_style{
  position: absolute;
  width: 3rem;
  right: 5rem;
  top: 1rem;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 35rem);
    width: 70rem;
  }
}

.text_output{
  text-align: left;
}
</style>