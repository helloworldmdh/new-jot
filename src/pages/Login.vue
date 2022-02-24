<template>
    <div class="login-page">
        <h1>Nice to see you!</h1>
        <div class="page-form">
            <h3>{{signIn ? "Sign in" : "Sign up"}}</h3>
            <div>
                <form class="sign-in-form">
                    <input v-model="login_email" type="email" placeholder="email" required />
                    <input v-model="login_password" type="password" placeholder="password" required />
                    <input v-if="!signIn" v-model="reg_confirmpassword" type="password" placeholder="confirm password" required />
                    <button type="submit" class="submit-btn" @click="submitLogin">Submit</button>
                    <label><input type="checkbox" v-model="rememberChoice" />Remember Me</label>
                    <a href="#" @click="invertSignIn">{{ informUser }}</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            signIn: true,
            // username: "",
            login_email: "",
            login_password: "",
            reg_confirmpassword: "",
            rememberChoice: true,
        }
    },
    
    // use this if you want to give the username to anyone
    // could possibly be done with emits instead if you don't want this to be App.vue
    // provide() {
    //     return {
    //         name: this.username,
    //     }
    // },

    computed: {
        informUser(){
            if (this.signIn)
                return "Don't have an account? Click here to sign up!";
            
            return "Already have an account?";
        },
    },

    methods: {
        invertSignIn(){
            this.signIn = !this.signIn;
        }
    }
}
</script>

<style scoped>
.login-page {
    color: black;
}

.page-form {
    margin: 30%;
    margin-bottom: 10%;
    margin-top: 20px;
    border-style: none;
    border-color: #dce0e6;
    border-radius: 20px;
    padding:10px;
    box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.4);
}

.sign-in-form {
    display: grid;
    padding-top: 20px;
    padding-left: 10%;
    padding-right: 10%;
}

.sign-in-form input, .sign-in-form button {
    margin-bottom: 20px;
}

button {
  border-radius: 4px;
  background-color: #5ca1e1;
  border: none;
  color: #fff;
  text-align: center;
  font-size: 32px;
  padding: 2%;
  transition: all 0.5s;
  cursor: pointer;
  box-shadow: 0 5px 10px -8px rgba(0, 0, 0,.7);
}

button{
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

button:after {
  content: '»';
  position: absolute;
  opacity: 0;  
  top: 6%;
  right: -20px;
  transition: 0.5s;
}

button:hover{
  padding-right: 24px;
  padding-left:8px;
}

button:hover:after {
  opacity: 1;
  right: 10px;
}

input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  border-radius: 5px;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
}

input:focus, input:focus:hover {
  background: #dbdbdb;
}

input:hover {
    background: #e8e8e8;
}

label input[type="checkbox"] {
    display: inline;
    width: 30px;
}

</style>