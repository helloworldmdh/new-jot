const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('cors')({ origin: true });
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.getTimeslots = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).get().then(doc => {
      if (!doc.exists) {
        console.log('No matching documents.');
        return ({ data: 'No user data in database' });
      }
      return ({ data: doc.data().timeSlots });
    });
})


exports.setTimeslots = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).update({
      timeSlots: data.newTimeSlots,
    }).then(() => {
      return ({ data: "Saved TimeSlot to Database" });
    });
});

exports.addTimeslot = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).update({
      timeSlots: admin.firestore.FieldValue.arrayUnion(data),
    }).then(() => {
      return ({ data: "Saved TimeSlot to Database" });
    });
});


exports.addModule = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).update({
      modules: admin.firestore.FieldValue.arrayUnion(data),
    }).then(() => {
      return ({ data: "Saved Module to Database" });
    });
});

exports.getModules = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).get().then(doc => {
      if (!doc.exists) {
        console.log('No matching documents.');
        return ({ data: 'No user data in database' });
      }
      return ({ data: doc.data().modules });
    });
})


exports.saveNewTime = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).update({
      timeStudied: data.timeStudied,
    }).then(() => {
      return ({ data: "Saved in modules in Database" });
    });
});



exports.gettotaltime = functions.https.onCall((request, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).get().then(doc => {
      if (!doc.exists) {
        console.log('No matching documents.');
        return ({ data: 'No user data in database' });
      }
      // 2. Send data back to client
      return ({ data: doc.data().timeStudied});
    });
});

exports.authSignUp = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection('users').doc(user.uid).set({
    // default values when the user signs up
    alias: user.email,
    timeSlots: [],
    modules: [],
    notes: [],
    timeStudied: 0,
  })
});

exports.authDelete = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection('users').doc(user.uid).delete();
});

exports.postNote = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid) {
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  } else {
    return admin.firestore().collection('users').doc(uid).update({
      notes: admin.firestore.FieldValue.arrayUnion(data),
    }).then(() => {
      return ({ data: 'Saved note in database' });
    });
  }
});

exports.getNotes = functions.https.onCall((_, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).get().then(doc => {
      if (!doc.exists) {
        console.log('No matching documents.');
        return ({ data: 'No user data in database' });
      }
      // console.log(snapshot)
      // 2. Send data back to client
      return ({ data: doc.data().notes});
    });
});