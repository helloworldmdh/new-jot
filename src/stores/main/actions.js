import { getAuth } from 'firebase/auth';
import app from '../../api/firebase.js';
import uniqid from 'uniqid';
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(app, 'europe-west2');

// actions can be dispatched with
// this.$store.dispatch('action-name-here');

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

  async getModulesFromServer(context) {
    const getModules = httpsCallable(functions, 'getModules')
    await getModules().then((result) => {
      context.commit('setModules', result.data.data);
    }).catch((error) => {
      console.log(error);
    })
  },

  async getTimeSlotsFromServer(context){
    const getTimeslots = httpsCallable(functions, 'getTimeslots');
    await getTimeslots().then((result) => {
      context.commit('setTimeSlots', result.data.data);
    }).catch((error) => {
      console.log(error);
    })
  },

  async getNotes(context){
    const getNotesHttps = httpsCallable(functions, 'getNotes');
    await getNotesHttps().then((result) => {
      context.commit('setNotes', result.data.data);
    }).catch((error) => {
      console.log(error);
    })
  },

  async getTotalTime(context) {
    const getTotalTimeHttps = httpsCallable(functions, "gettotaltime");
    await getTotalTimeHttps().then((result) => {
      context.commit('setTimeStudied', result.data.data)
      console.log(result.data.data)
    }).catch((error) => {
      console.log(error);
    });
  },

  async addSlot(_, payload) {
    const addTimeslot = httpsCallable(functions, 'addTimeslot');
    const id = uniqid();
    await addTimeslot({
      moduleID: payload.moduleID,
      timeslotID: payload.id ? payload.id : id,
      title: payload.title,
      startTime: payload.startTime,
      length: payload.length,
      day: payload.day,
    }).then((result) => {
      // Read result of the Cloud Function.
      // /** @type {any} */
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  },

  async addModule(context, payload) {
    const addModule = httpsCallable(functions, "addModule");
    const id = uniqid();
    await addModule({
      moduleID: id,
      moduleName: payload.moduleName,
      colour: payload.colour,
      lecturer: payload.lecturer,
    }).then((result) => {
        // Read result of the Cloud Function.
        // /** @type {any} */
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  
  //async editTimeSlot(){
  // const updateTimeslot = httpsCallable(functions, "updateTimeslot");
  // await updateTimeslot({
  //   moduleID: payload.moduleID,
  //   timeslotID: payload.timeslotID,
  //   title: payload.title,
  //   startTime: payload.startTime,
  //   length: payload.length,
  //   day: payload.day,
  // }).then((result) => {
  //     console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // });
  // }

  async getTimeSlots(context){
    const functions = getFunctions(app, 'europe-west2');
    const getTimeslots = httpsCallable(functions, 'getTimeslots');
    await getTimeslots().then((result) => {
      context.commit('setTimeSlots', result.data.data);
    })
  },

  async addNote(context, payload) {
    const addNote = httpsCallable(functions, "addNote");
    const id = uniqid();
    await addNote({
      moduleID: payload.modID,
      noteID: payload.id ? payload.id : id,
      title: payload.title,
      date: payload.date,
      text: payload.text,
    }).then((result) => {
        // Read result of the Cloud Function.
        // /** @type {any} */
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
  },

  async deleteNote(context, payload) {
    const deleteNote = httpsCallable(functions, "deleteNote");
    await deleteNote(payload).then(result => {
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    })
  }

}