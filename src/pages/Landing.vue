<template style="{margin-left: 0px}">
    <header class="header">
        <h1 id="app-name">NewJot</h1>
        <div id="desc">All a student needs in one place</div>
        <base-button to="/login"><div id="login-text">Log In</div></base-button>
        <!--<router-link to="/about"></router-link>-->
        <!--<router-link to="/more" -->
    </header>
</template>

<script>
export default {
//
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

header {
    font-family: 'Montserrat', sans-serif;
} 

#app-name{
    margin-top:10%;
    margin-bottom: 5rem;
    font-size: 64px;
}

#desc{
    font-style: italic;
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 5%;
}

#login-text{
    margin-top:12px;
}
</style> 


    