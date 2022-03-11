<template>
    <router-link :to="to" class="link"> <!--to:"to" is a router method-->
        <slot />
    </router-link>
</template>

<script>
import { sidebarCollapsed } from './sidebar-state.js'

export default {
    name: "SidebarLink",
    props: {
        to: {type: String, required: true},
    },
    setup() {
        return {sidebarCollapsed}
    }
}
</script>


<style scoped>
.link{
    display: flex;
    margin-left: 35%;
    position: relative;
}
</style>