function loadPage (component) {
    // '@' is aliased to src/components
    return () => import(/* webpackChunkName:"[request]" */ `@/pages/${component}.vue`)
}
export default [
    { path: '/', component: loadPage('Landing') },
    { path: '/aboutus', component: loadPage('AboutUs') },
    { path: '/timetable', component: loadPage('Timetable') },
    { path: '/login', component: loadPage('Login')},
    { path: '/settings', component: loadPage('Settings')},
    { path: '/notes', component: loadPage('NotePage')},
    { path: '/timer', component: loadPage('Timer')},
    //copy and paste above with other page details to establish further routes
]