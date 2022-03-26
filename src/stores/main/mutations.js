export default {
  setLoggedIn(state, payload){
    state.isSignedIn = !!payload;
  },
  setNotes(state, payload) {
    state.notes = payload;
  },
  setTimeSlots(state, payload) {
    state.timeSlots = payload;
  },
  setModules(state, payload) {
    state.modules = payload;
  },
  setTimeStudied(state, payload) {
    state.timeStudied = payload;
  }
};