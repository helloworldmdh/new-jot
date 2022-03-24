<template>
  <div class="login-body">
    <div class="header">
      <router-link to="/aboutus" class="link">About the App</router-link>
    </div>
    <div class="page-form">
      <h3 class="login-title">{{ signIn ? "Sign in" : "Sign up" }}</h3>
      <div>
        <form class="sign-in-form" @submit.prevent="">
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
          <p v-if="error">Error: {{ error }}</p>
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
      // username: "",
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

  // use this if you want to give the username to anyone
  // could possibly be done with emits instead if you don't want this to be App.vue
  // probably better to store this with vuex
  // provide() {
  //   return {
  //     name: this.username,
  //   }
  // },

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
      //this.formIsValid = this.email.val.includes('@.') && (!this.signIn ? this.confirmedPass.val > 7 : this.password.val > 7);
      this.formIsValid = true;

      this.email.isValid =
        this.email.val.includes("@") && this.email.val.includes(".");
      this.password.isValid = this.password.val.length > 7;
      this.confirmedPass.isValid = this.confirmedPass.val === this.password.val;

			return this.formIsValid = this.email.isValid && this.password.isValid && (!this.signIn ? this.confirmedPass.isValid : true);
		},

    submitDetails(){
      if (!this.validateForm) return;
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
          alert(error.message);
        })

      } else {
        setPersistence(auth, browserSessionPersistence).then(()=> {
          return signInWithEmailAndPassword(auth, this.email.val, this.password.val);
        })
         //.then((userCredential) => {
        //   // var user = userCredential.user;
        //   // document.cookie = "accessToken=" + user.accessToken;
        //   // console.log("Cookie Jar Access Token : ", getCookie("accessToken"));
        //   // localStorage.setItem('access token', user.accessToken);
        // }).catch((error) => {
        //   alert(error.message);
        // })
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
.login-body {
  background: url(../assets/img/landing.jpg) no-repeat;
  height: 100vh;
  background-size: auto auto;
  color: #14142c;
}

.header {
  height: 5rem;
  width: 100%;
  background-color: var(--accent-one);
  box-shadow: 0px 2px 10px rgb(151, 151, 151);
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
.login-title {
  font-size: 40px;
}

.page-form {
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

.sign-in-form {
  display: grid;
  padding-top: 20px;
  padding-left: 10%;
  padding-right: 10%;
}

.sign-in-form input,
.sign-in-form button {
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