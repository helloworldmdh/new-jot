import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

// might want to move all of this into an 'auth' store instead of a main store...
export default {
  state(){
    return {
      isSignedIn: false,
    };
},

  getters,
  mutations,
  actions,
}