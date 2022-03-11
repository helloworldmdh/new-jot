import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default {
  async submitRegister(context, details){
    if (context.getters.userSignedIn) return;

    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => { 
        const tokenResponse = userCredential._tokenResponse;
        context.dispatch('loginOperations', tokenResponse);
        return userCredential;
      })
      .catch((error) => {
        context.commit('setErrorMessage', error.message);
        return error;
      });
    },

  async submitLogin(context, details){
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        const tokenResponse = userCredential._tokenResponse;
        context.dispatch('loginOperations', tokenResponse);
        return userCredential;
      })
      .catch((error) => {
        context.commit('setErrorMessage', error.message);
        return error;
    });
  },

  loginOperations(context, tokenResponse){
    context.commit('setEmail', tokenResponse.email);
    context.commit('setId', tokenResponse.localId);
    context.commit('setTokenId', tokenResponse.idToken);
    context.commit('setSignedIn', true);
    context.commit('setExpiresIn', tokenResponse.expiresIn);
    context.commit('setErrorMessage', null);
  },

  logout(context){
    context.commit('setEmail', null);
    context.commit('setId', null);
    context.commit('setTokenId', null);
    context.commit('setSignedIn', false);
    context.commit('setExpiresIn', 0);
    context.commit('setErrorMessage', null);

    localStorage.removeItem('userEmail');
    localStorage.removeItem('password');

    clearTimeout(context.state.authTimer);
  },
};