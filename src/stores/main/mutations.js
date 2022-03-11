export default {
  setEmail(state, payload){
    state.currUser_email = payload;
  },
  setId(state, payload){
    state.currUser_id = payload;
  },
  setSignedIn(state, payload){
    state.isSignedIn = !!payload; // makes sure the payload is a boolean
  },
  setExpiresIn(state, payload) {
    state.currUser_expiresIn = payload;
  },
  setErrorMessage(state, payload){
    state.errorMessage = payload;
  },
  setTokenId(state, payload){
    state.currUser_token = payload;
  }
};