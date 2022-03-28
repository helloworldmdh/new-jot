import { ref, computed } from 'vue'

export const guideCollapsed = ref(true);
export const toggleGuide = () => (guideCollapsed.value = !guideCollapsed.value)   //toggle expands guide if clicked value changes 


export const guide_width = 20
export const guideCollapsed_width = 5
export const guideWidth = computed(
     () =>`${guideCollapsed.value ? guideCollapsed_width : guide_width}%`) //based on the value of guideCollapsed the width value will change