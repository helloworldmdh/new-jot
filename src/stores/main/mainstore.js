import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

// might want to move all of this into an 'auth' store instead of a main store...
export default {
  state(){
    return {
      currUser_email: null,
      currUser_id: null,
      currUser_expiresIn: Number,
      currUser_token: null,
      isSignedIn: false,
      errorMessage: null,
      authTimer: null,
    };
},

  getters,
  mutations,
  actions,
}