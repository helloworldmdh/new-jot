import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  setup(){
    return {
        user_email: null,
    };
  },
  getters,
  actions,
  mutations,
}