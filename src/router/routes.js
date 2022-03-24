function loadPage (component) {
    // '@' is aliased to src/components
    return () => import(/* webpackChunkName:"[request]" */ `@/pages/${component}.vue`)
}
export default [
    { path: '/', component: loadPage('Landing') },
    { path: '/aboutus', component: loadPage('AboutUs') },
    { path: '/timetable', component: loadPage('Timetable'), meta: { requiresAuth: true } },
    { path: '/login', component: loadPage('Login'), meta: { requiresNoAuth: true } },
    { path: '/settings', component: loadPage('Settings'), meta: { requiresAuth: true } },
    { path: '/notes', component: loadPage('NotePage'), meta: { requiresAuth: true } },
    { path: '/timer', component: loadPage('Timer'), meta: { requiresAuth: true } },
    { path: '/notfound', component: loadPage('NotFound') },
    { path: '/:notFound(.*)', redirect: '/notfound'} // catchAll route
    //copy and paste above with other page details to establish further routes
]