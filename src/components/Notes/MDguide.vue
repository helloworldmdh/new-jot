<template>
  <div class="guide_md" :style="{ width: guideWidth }">
    <span @click="toggleGuide">
    <box-icon
      id="info_icon"
      name="info-square"
      size="lg"
      color="black"
    />
    </span>
    <transition-group name="slide-fade">
    <div class="guide_display" v-if="!guideCollapsed">
      <div class="guide_header">
        <h1>Markdown Guide</h1>
      </div>
      <div class="guide_details">
        <div class="element_table">
          <div class="h_list">Headings</div>
          <div class="divide"></div>
          <div class="h_label">Bold</div>
          <div class="divide"></div>
          <div class="h_label">Italic</div>
          <div class="divide"></div>
          <div class="h_label">Strikethrough</div>
          <div class="divide"></div>
          <div class="h_list">Ordered Lists</div>
          <div class="divide"></div>
          <div class="h_list">Unordered Lists</div>
          <div class="divide"></div>
          <div class="h_label">Links</div>
        </div>
        <div class="syntax_table">
          <div class="d_list">
            # H1 Biggest Text<br />
            ## H2 Bigger Text<br />
            ### H3 Big Text
          </div>
          <div class="h_desc">**Text goes here**</div>
          <div class="h_desc">*Text goes here*</div>
          <div class="h_desc">~~Text goes here~~</div>
          <div class="d_list">
            1. Item One<br />
            2. Item Two<br />
            3. Item Three
          </div>
          <div class="d_list">
            - Item One<br />- Item Two <br />- Item Three
          </div>
          <div class="h_desc">[Link name goes here]<br />(Insert URL like this)</div>
        </div>
      </div>
    </div>
    </transition-group>
  </div>
</template>

<script>
import { guideCollapsed, toggleGuide, guideWidth } from "./MDguide";

export default {
  name: "MDGuide",
  setup() {
    /*declares reactive states */
    return { guideCollapsed, toggleGuide, guideWidth }; //
  },
};
</script>

<style>
.guide_md {
  color: #242142;
  background-color: white;
  border-left: 2px solid #0a0053;

  float: left;
  position: fixed;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease; /* speed of toggle */

  display: flex;
  flex-direction: column;
}

#info_icon{
  position: absolute;
  right: 2rem;
}

.guide_header {
  text-align: center;
  margin-left: -4px;
  margin-top: 2em;
  padding-bottom: 0.5rem;
  font-size: var(--h1-font-size);
  border-bottom: 2px solid #0a0053;
}

.element_table {
  float: left;
  width: 35%;
  padding: 1rem 0rem 1rem;
}

.syntax_table {
  float: right;
  width: 65%;
  padding: 1rem;
}

.guide_details {
  text-align: left;
}

.h_label {
  height: 3em;
  padding: 1rem 0rem 1rem;
}

.d_list {
  height: 7em;
  padding: 1rem 0rem 1rem;
}

.h_desc, .h_list {
  height: 5em;
  padding: 1rem 0rem 1rem;
}

.divide{
  margin-right: -10vw;
  height: .01rem;
  background-color: #0a0053;
  width: 20vw;
  margin-top: 2em;
  z-index: 2;
}

.slide-fade-enter-active {
  transition: all 2.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>