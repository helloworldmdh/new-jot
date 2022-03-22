const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('cors')({origin: true});
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.setTimeslot = functions.https.onCall((request, context) => {
    const uid = context.auth.uid;
    if(!uid)
        throw new functions.https.HttpsError('no-userid', 'The requested user wasnot found');
    else
        return admin.firestore().collection('users').doc(uid).set({ 
            timeslot: request.body.data.timeslot, }).then(()=> {
            request.send({"data": "Saved in TimeSlot in Database"});
        });
});

exports.setModule = functions.https.onCall((request, context) => {
  const uid = context.auth.uid;
  if(!uid)
      throw new functions.https.HttpsError('no-userid', 'The requested user wasnot found');
  else
      return admin.firestore().collection('users').doc(uid).set({ 
          modules: request.body.data.module, }).then(()=> {
          request.send({"data": "Saved in modules in Database"});
      });
});


exports.authSignUp = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection('users').doc(user.uid).set({
    // default values when the user signs up
    alias: user.email, 
    timeSlots: [],
    modules: [],
    timeStudied: 0,
  })
});

exports.authDelete = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection('users').doc(user.uid).delete();
});