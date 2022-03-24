import { getAuth } from 'firebase/auth';
import app from '../../api/firebase.js';

export default {
  logUser(context){
    const auth = getAuth(app);

    auth.onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        context.commit('setLoggedIn', true);
      } else {
        // User not logged in or has just logged out.
        context.commit('setLoggedIn', false);
      }
    })
  },
}