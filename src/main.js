import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory } from 'vue-router';
import routes from './router/routes';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import {createStore} from 'vuex';
import mainstore from './stores/main/mainstore.js';
import fb_app from './api/firebase';
import { getAuth } from 'firebase/auth';

import BaseButton from './components/UI/BaseButton.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseDialog from './components/UI/BaseDialog.vue';


const store = createStore(mainstore);

const router = createRouter({
    history:createWebHistory(),
    routes,
})


router.beforeEach(function(to, _, next){
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

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog)
app.use(router);
app.use(store);
app.use(Loading);
app.mount('#app');
