<template>
  <div class="login_body">
    <div class="header">
      <img class="logo" src="../assets/img/logo.png"/>
      <router-link to="/aboutus" class="link">About the App</router-link>
    </div>
    <div class="page_form">
      <h1 class="login_title">{{ signIn ? "Sign in" : "Sign up" }}</h1>
      <div>
        <form class="sign_in_form" @submit.prevent="">
          <input
            v-model.trim="email.val"
            type="email"
            placeholder="email"
            required
          />
          <input
            v-model.trim="password.val"
            type="password"
            placeholder="password"
            required
          />
          <input
            v-if="!signIn"
            v-model.trim="confirmedPass.val"
            type="password"
            placeholder="confirm password"
            required
          />
          <p v-if="!formIsValid">
            ERROR! Please make sure you provide {{ mustProvide }}
          </p>
          <div class="error_style" v-if="error">Error: {{ error }}</div>
          <button type="submit" class="submit-btn" @click="submitDetails">
            Submit
          </button>
          <label
            ><input type="checkbox" v-model="rememberChoice" />Remember
            Me</label
          >
          <a href="#" @click="invertSignIn">{{ informUser }}</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, browserLocalPersistence, setPersistence, browserSessionPersistence} from 'firebase/auth';
import app from '../api/firebase.js';

export default {
  data() {
    return {
      signIn: true,
      email: {
        val: "",
        isValid: false,
      },
      password: {
        val: "",
        isValid: false,
      },
      confirmedPass: {
        val: "",
        isValid: false,
      },

      rememberChoice: true,
      formIsValid: true,
      error: null,
      userEmail: "",
    };
  },


  computed: {
    informUser() {
      if (this.signIn) return "Don't have an account? Click here to sign up!";

      return "Already have an account?";
    },
    mustProvide() {
      if (!this.email.isValid) {
        return "a valid email address!";
      }
      if (!this.password.isValid)
        return "a valid password longer than 7 characters!";
      if (!this.signIn && !this.confirmedPass.isValid) {
        return "matching passwords!";
      }
      return "all details!";
    },
  },

  methods: {
    invertSignIn() {
      this.error = null;
      this.signIn = !this.signIn;
    },

    validateForm() {
      this.formIsValid = true;

      this.email.isValid = this.email.val.includes("@") && this.email.val.includes(".");
      this.password.isValid = this.password.val.length > 7;
      this.confirmedPass.isValid = this.confirmedPass.val === this.password.val;
      const res = this.formIsValid = this.email.isValid && this.password.isValid && (!this.signIn ? this.confirmedPass.isValid : true)
			return res;
		},

    submitDetails(){
      if (!this.validateForm()) return;
      if (this.signIn) this.login();
      else this.signup();
    }, 

    login(){
      const auth = getAuth(app);
      if (this.rememberChoice) {
        setPersistence(auth, browserLocalPersistence).then(() => {
          return signInWithEmailAndPassword(auth, this.email.val, this.password.val).then(() =>{
            this.$router.replace('/timetable');
          });
        })
        .catch((error) => {
          this.error = error.message;
          console.log(error.message);
        })
      } else {
        setPersistence(auth, browserSessionPersistence).then(()=> {
          return signInWithEmailAndPassword(auth, this.email.val, this.password.val).then(()=>{
            this.$router.replace('/timetable');
          });
        }).catch((error)=>{
          this.error = error.message;
        })
      }
    },

    signup(){
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, this.email.val, this.password.val)
      .then(() => {
        this.$router.replace('/timetable');
      })
      .catch((error) => {
        alert(error.message);
      });      
    }
  },
};
</script>

<style scoped>
.login_body {
  background: url(../assets/img/landing.jpg) no-repeat;
  height: 100vh;
  background-size: auto auto;
}

.header {
  height: 5rem;
  width: 100%;
  background-color: var(--accent-one);
  box-shadow: 0px 2px 10px rgb(151, 151, 151);
}

.logo{
  position: fixed;
  left: 2rem;
  height:5rem;
  width: 5rem;
}

.link {
  color: white;
  position: fixed;
  font-size: 24px;
  top: 1.25rem;
  right: 2.5rem;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
}

.link:hover {
  text-decoration: underline;
}
.login_title {
  font-size: 40px;
}

.error_style {
  color: red;
}

.page_form {
  justify-content: center;
  padding: 1rem;
  top: 6vh;
  position: relative;
  display: block;
  border-radius: 1em;
  box-shadow: 0px 5px 10px #6867a1;
  width: 40%;
  margin-top: 4vh;
  margin-left: auto;
  margin-right: auto;
  background-color: aliceblue;
}

.sign_in_form {
  display: grid;
  padding-top: 20px;
  padding-left: 10%;
  padding-right: 10%;
}

.sign_in_form input,
.sign_in_form button {
  margin-bottom: 20px;
}

button {
  border-radius: 4px;
  background-color: var(--main-color);
  border: none;
  color: #fff;
  text-align: center;
  font-size: 32px;
  padding: 2%;
  transition: all 0.5s;
  cursor: pointer;
  display: inline-block;
  position: relative;
  box-shadow: 0 5px 10px -8px rgba(0, 0, 0, 0.7);
}

button:after {
  content: "»";
  position: absolute;
  opacity: 0;
  top: 6%;
  right: -20px;
  transition: 0.5s;
}

button:hover {
  padding-right: 24px;
  padding-left: 8px;
}

button:hover:after {
  opacity: 1;
  right: 10px;
}

input {
  outline: 0;
  background: #ffffff;
  width: 100%;
  border: 0;
  border-radius: 5px;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
}

input:focus,
input:focus:hover {
  background: #dbdbdb;
}

input:hover {
  background: #e8e8e8;
}

label input[type="checkbox"] {
  display: inline;
  width: 30px;
}

.sign-up {
  text-decoration: none;
  color: rgb(51, 51, 51);
}

.sign-up:hover {
  transform: translateY(0.05rem);
  text-decoration: underline;
}
</style>