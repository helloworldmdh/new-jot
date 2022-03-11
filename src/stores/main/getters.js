export default {
  userEmail(state){
    return state.currUser_email;
  },
  userId(state){
    return state.currUser_id;
  },
  userExpiresIn(state){
    return state.currUser_expiresIn;
  },
  userSignedIn(state){
    return state.isSignedIn;
  },
  authErrorMessage(state){
    return state.errorMessage;
  },
  userToken(state){
    return state.currUser_token;
  }
};