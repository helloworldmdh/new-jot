export default {
  setLoggedIn(state, payload){
    state.isSignedIn = !!payload;
  },
};