export default {
  isSignedIn(state){
    return state.isSignedIn;
  },
  getterNotes(state){
    return state.notes;
  },
  getterTimeSlots(state){
    return state.timeSlots;
  },
  getterModules(state){
    return state.modules;
  },
  getterTotalTime(state){
    return state.timeStudied;
  },
};