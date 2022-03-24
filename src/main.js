import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory } from 'vue-router';
import routes from './router/routes';

import {createStore} from 'vuex';
import mainstore from './stores/main/mainstore.js';
import fb_app from './api/firebase';
import { getAuth } from 'firebase/auth';

import BaseButton from './components/UI/BaseButton.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
//import '@fortawesome/fontawesome-free/js/all'

const store = createStore(mainstore);

const router = createRouter({
    history:createWebHistory(),
    routes,
})



// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         if (!store.getters.isSignedIn) {
//             next({ path: '/login' })
//         } else {
//             next() // go to wherever I'm going
//         }
//     }
//     else if (to.matched.some(record => record.meta.requiresNoAuth)) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         if (store.getters.isSignedIn) {
//           next({ path: '/' })
//         } else {
//           next() // go to wherever I'm going
//         }
//     }
//     else {
//       next() // does not require auth, make sure to always call next()!
//     }
// })

router.beforeEach(function(to, _, next){
    // console.log(to.meta.requiresNoAuth);
    // console.log(store.getters.isSignedIn);
    const auth = getAuth(fb_app);
    auth.onAuthStateChanged(user => {
        if (to.meta.requiresAuth && !user) {
            next('/login');
        } else if (to.meta.requiresNoAuth && user) {
            next('/');
        } else {
            next();
        }
    })    
});

const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog)
app.use(router);
app.use(store);
app.mount('#app');

