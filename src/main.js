import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory } from 'vue-router';
import routes from './router/routes';
//import '@fortawesome/fontawesome-free/js/all'

let router = createRouter({
    history:createWebHistory(),
    routes: routes,
});



const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.

app.use(router);
app.mount('#app');
