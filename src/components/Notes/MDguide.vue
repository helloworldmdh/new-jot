<template>
  <div class="guide_md" :style="{ width: guideWidth }">
    <span @click="toggleGuide">
      <box-icon id="info_icon" name="info-square" size="lg" color="black" />
    </span>
    <transition-group name="slide-fade">
      <div
        class="guide_display"
        v-if="!guideCollapsed"
      >
        <div class="guide_header">
          <h1>Markdown Guide</h1>
        </div>
        <div class="guide_details">
          <div class="element_table">
            <div class="h_list">Headings</div>
            <div class="d_list">
              # H1 Biggest Text<br />
              ## H2 Bigger Text<br />
              ### H3 Big Text
            </div>
            <hr class="solid" />
            <div class="h_label">Bold</div>
            <div class="h_desc">**Text goes here**</div>
            <hr class="solid" />
            <div class="h_label">Italic</div>
            <div class="h_desc">*Text goes here*</div>
            <hr class="solid" />
            <div class="h_label">Strikethrough</div>
            <div class="h_desc">~~Text goes here~~</div>
            <hr class="solid" />
            <div class="h_list">Ordered Lists</div>
            <div class="d_list">
              1. Item One<br />
              2. Item Two<br />
              3. Item Three
            </div>
            <hr class="solid" />
            <div class="h_list">Unordered Lists</div>
            <div class="d_list">
              - Item One<br />- Item Two <br />- Item Three
            </div>
            <hr class="solid" />
            <div class="h_label">Links</div>
            <div class="h_desc">
              [Link name goes here]<br />(Insert URL like this)
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>

export default {
  name: "MDGuide",
  computed: {
    guideWidth(){
      return `${this.guideCollapsed ? this.guideCollapsed_width : this.guide_width}%`;
    }
  },
  methods: {
    toggleGuide() {
      this.guideCollapsed = !this.guideCollapsed;
    },
  },
  data() {
    return{
      guideCollapsed: true,
      guide_width: 20,
      guideCollapsed_width: 5,
    };
  }
};
</script>

<style>
.guide_md {
  color: #242142;
  background-color: white;
  border-left: 2px solid #0a0053;

  float: right;
  position: fixed;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.6s ease; /* speed of toggle */

  display: flex;
  flex-direction: column;
}

#info_icon {
  position: absolute;
  right: 1rem;
}

.guide_header {
  text-align: center;
  margin-left: -4px;
  margin-top: 2em;
  padding-bottom: 0.25rem;
  font-size: var(--h1-font-size);
  border-bottom: 2px solid #0a0053;
  white-space: nowrap;
}

.element_table {
  padding: 1rem 1rem 1rem;
}

.guide_details {
  text-align: left;
}

.h_desc {
  height: 2em;
  padding:0.25rem 0rem 0.25rem;
}

.d_list {
  height: 4em;
  padding:0.25rem 0rem 0.25rem;
}

.h_label,
.h_list {
  text-decoration: underline;
  word-break: break-all;
  height: 2em;
  padding: 0.25rem 0rem 0.25rem;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>