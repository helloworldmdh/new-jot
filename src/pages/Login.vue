<template>
  <div class="login-page">
    <h1 class="login-title">Nice to see you!</h1>
    <div class="page-form">
      <h3>{{signIn ? "Sign in" : "Sign up"}}</h3>
      <div>
        <form class="sign-in-form" @submit.prevent="">
          <input v-model.trim="email.val" type="email" placeholder="email" required />
          <input v-model.trim="password.val" type="password" placeholder="password" required />
          <input v-if="!signIn" v-model.trim="confirmedPass.val" type="password" placeholder="confirm password" required />
					<p v-if="!formIsValid">Please make sure you provide {{mustProvide}}</p>
          <button type="submit" class="submit-btn" @click="submitLogin">Submit</button>
          <label><input type="checkbox" v-model="rememberChoice" />Remember Me</label>
          <a href="#" @click="invertSignIn" class="sign-up">{{ informUser }}</a>
          <p v-if="$store.getters.getUserEmail">{{ $store.getters.getUserEmail }}</p>
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
    }
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
    informUser(){
      if (this.signIn)
        return "Don't have an account? Click here to sign up!";
      
      return "Already have an account?";
    },
		mustProvide(){
			if (!this.email.isValid) {
				return "a valid email address!";
			}
			if (!this.password.isValid)
				return "a valid password longer than 7 characters!";
			if (!this.signIn && !this.confirmedPass.isValid) {
				return "matching passwords!";
			}
			return "all details!";
		}
		
  },

  methods: {
    invertSignIn(){
      this.signIn = !this.signIn;
    },

		validateForm(){
			//this.formIsValid = this.email.val.includes('@.') && (!this.signIn ? this.confirmedPass.val > 7 : this.password.val > 7);
			this.formIsValid = true;

			this.email.isValid = this.email.val.includes('@') && this.email.val.includes('.');
			this.password.isValid = this.password.val.length > 7;
			this.confirmedPass.isValid = this.confirmedPass.val === this.password.val;

			this.formIsValid = this.email.isValid && this.password.isValid && (!this.signIn ? this.confirmedPass.isValid : true);
		},
		
		submitLogin(){
			this.validateForm();
      this.$store.state.user_email = "nice";
		}
  }
}
</script>

<style scoped>
.login-page {
  color: rgb(51, 51, 51);
}

.login-title{
  margin-top: 2rem;
  font-size: 40px;
}

.page-form {
  margin: 30%;
  margin-bottom: 10%;
  margin-top: 2rem;
  border-style: none;
  border-color: #dce0e6;
  border-radius: 20px;
  padding:10px;
  box-shadow: 0 5px 8px 0px rgba(82, 82, 82, 0.4);
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
  background-color: #a8a8a8;
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

.sign-up{
  text-decoration: none;
  color: rgb(51, 51, 51);
}

.sign-up:hover{
  transform: translateY(0.05rem);
  text-decoration: underline;
}
</style>