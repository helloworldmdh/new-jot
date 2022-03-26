const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('cors')({ origin: true });
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.getTimeslots = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('Timeslots').doc(uid).get().then(doc => {
      if (!doc.exists) {
        console.log('No matching documents.');
        return ({ data: 'No user data in database' });
      }
      return ({ data: doc.data().timeSlots });
    });
})


exports.setTimeslots = functions.region('europe-west2').https.onCall((data, context) => {
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

exports.addTimeslot = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).collection('modules').doc(data.moduleName).collection('timeslots').doc(data.timeslotID).set({
      title: data.title,
      startTime: data.startTime,
      length: data.length,
      day: data.day,
    }).then(() => {
      return ({ data: "Saved TimeSlot to Database" });
    });
});


exports.addModule = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).collection('modules').doc(data.moduleName).set({
      colour: data.colour,
      lecturer: data.lecturer
    }).then(() => {
      return ({ data: "Saved Module to Database" });
    });
});

exports.getModules = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  let array = [];
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).collection('modules').get().then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        throw new functions.https.HttpsError('no-userid', 'The requested users module data was not found');
      }
      snapshot.forEach(doc => {
        array.push(Object.assign(doc.data(),{name:doc.id}))
      })
      return ({ data: array });
    });
})


exports.saveNewTime = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).update({
      timeStudied: data.timeStudied,
    }).then(() => {
      return ({ data: "Saved in Time in Database" });
    });
});



exports.gettotaltime = functions.region('europe-west2').https.onCall((request, context) => {
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

exports.authSignUp = functions.region('europe-west2').auth.user().onCreate((user) => {
  return admin.firestore().collection('users').doc(user.uid).set({
    timeStudied: 0,
  })
});

exports.authDelete = functions.region('europe-west2').auth.user().onDelete((user) => {
  return admin.firestore().collection('users').doc(user.uid).delete();
});

exports.postNote = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid) {
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  } else {
    return admin.firestore().collection('Notes').doc(uid).update({
      notes: admin.firestore.FieldValue.arrayUnion(data),
    }).then(() => {
      return ({ data: 'Saved note in database' });
    });
  }
});

exports.getNotes = functions.region('europe-west2').https.onCall((_, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('Notes').doc(uid).get().then(doc => {
      if (!doc.exists) {
        console.log('No matching documents.');
        return ({ data: 'No user data in database' });
      }
      // console.log(snapshot)
      // 2. Send data back to client
      return ({ data: doc.data().notes});
    });
});

exports.deleteUserInfo = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
     admin.firestore().collection("users").doc(uid).delete().then(function () {
        return ({ data: "Document successfully deleted!"});
     })
});

// exports.updateTimeslot = functions.region('europe-west2').https.onCall((data, context) => {
//   const uid = context.auth.uid;
//   if (!uid)
//     throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
//   else
//   return admin.firestore().collection('users').doc(uid).update({ timeSlots: 
  
//   }).then(() => {
//       return ({ data: "Updated document in database" });
//   });
// });