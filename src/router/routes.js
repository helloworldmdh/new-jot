function loadPage (component) {
    // '@' is aliased to src/components
    return () => import(/* webpackChunkName:"[request]" */ `@/pages/${component}.vue`)
}
export default [
    { path: '/', component: loadPage('Timetable') },
    //copy and paste above with other page details to establish further routes
]