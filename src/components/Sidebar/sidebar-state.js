import { ref, computed } from 'vue'

export const sidebarCollapsed = ref(true);
export const toggleSidebar = () => (sidebarCollapsed.value = !sidebarCollapsed.value)   //toggle expands sidebar if clicked value changes 


export const sidebar_width = 150
export const sidebarCollapsed_width = 50
export const sidebarWidth = computed(
     () =>`${sidebarCollapsed.value ? sidebarCollapsed_width : sidebar_width}px`) //based on the value of sidebarCollapsed the width value will change