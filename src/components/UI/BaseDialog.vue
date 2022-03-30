<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <header :style="{'background-color': colour, 'color': computedFont}">
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu>
        <slot name="actions">
          
        </slot>
        <button class="btn btn-primary m-3" @click="tryClose">Close</button>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
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
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    colour: {
      type: String,
      required: false,
      default: "#5fccff"
    }
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
  },
  computed: {
    computedFont() {
      // Counting the perceptive luminance - human eye favors green color...
      if (this.colour.length != 7) return "#646464"
      var luminance = (0.299 * this.hexToRgb(this.colour).r + 0.587 * this.hexToRgb(this.colour).g + 0.114 * this.hexToRgb(this.colour).b)/255;
      if (luminance < 0.5)
        return "#ffffff"
      else
        return "#000000"
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
  background-color: #5fccff;
  color: white;
  width: 100%;
  padding: var(--normal-font-size);
}

header h2 {
  margin: 0;
}

section {
  padding: var(--normal-font-size);
}

menu {
  padding: var(--normal-font-size);
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>