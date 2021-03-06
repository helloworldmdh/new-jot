const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('cors')({ origin: true });
admin.initializeApp();
const db = admin.firestore();


exports.getTimeslots = functions.region('europe-west2').https.onCall((data, context) => {  
  const getData = async () => {
      const uid = context.auth.uid;
      let array = [];
      if (!uid) {
          throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
      } else {
          const modulesRef = db.collection('users').doc(uid).collection('modules');
          const modulesQuery = modulesRef.where('name', '!=', '');
          const modulesQuerySnap = await modulesQuery.get();
          const moduleDocuments = modulesQuerySnap.docs.map((doc) => ({ id: doc.id }));

          for (const moduleDocument of moduleDocuments) {
            const timeslotsRef = modulesRef.doc(moduleDocument.id).collection('timeslots');
            const timeslotsQuery = timeslotsRef.where('length', '!=', -1);
            const timeslotsQuerySnap = await timeslotsQuery.get();
            const timeslotDocuments = timeslotsQuerySnap.docs.map((doc) => ({ id: doc.id, data: doc.data() })); 
            

              for (const timeslotDocument of timeslotDocuments) {
                array.push(Object.assign(timeslotDocument.data, {id: timeslotDocument.id, modID: moduleDocument.id}))
              }
          }
          return ({ data: array });
      }
  }
  return getData()
  .then((response) => { 
      return response;
  });
})

exports.addTimeslot = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).collection('modules').doc(data.moduleID).collection('timeslots').doc(data.timeslotID).set({
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
    return admin.firestore().collection('users').doc(uid).collection('modules').doc(data.moduleID).set({
      name: data.moduleName,
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
        return ({ data: [] })
      }
      snapshot.forEach(doc => {
        array.push(Object.assign(doc.data(),{id:doc.id}))
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
      return ({ data: doc.data().timeStudied});
    });
});

exports.authSignUp = functions.region('europe-west2').auth.user().onCreate((user) => {
  return admin.firestore().collection('users').doc(user.uid).set({
    timeStudied: 0,
  })
});

exports.addNote = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).collection('modules').doc(data.moduleID).collection('notes').doc(data.noteID).set({
      title: data.title,
      date: data.date,
      text: data.text,
    }).then(() => {
      return ({ data: "Saved Notes to Database" });
    });
});


exports.getNotes = functions.region('europe-west2').https.onCall((data, context) => {  
  const getData = async () => {
      const uid = context.auth.uid;
      let array = [];

      if (!uid) {
          throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
      } else {
          const modulesRef = db.collection('users').doc(uid).collection('modules');
          const modulesQuery = modulesRef.where('name', '!=', '');
          const modulesQuerySnap = await modulesQuery.get();
          const moduleDocuments = modulesQuerySnap.docs.map((doc) => ({ id: doc.id }));

          for (const moduleDocument of moduleDocuments) {
            const notesRef = modulesRef.doc(moduleDocument.id).collection('notes');
            const notesQuery = notesRef.where('title', '!=', '');
            const notesQuerySnap = await notesQuery.get();
            const notesDocuments = notesQuerySnap.docs.map((doc) => ({ id: doc.id, data: doc.data() })); 

              for (const notesDocument of notesDocuments) {
                array.push(Object.assign(notesDocument.data, {id: notesDocument.id, modID: moduleDocument.id}))
              }
          }
          return ({ data: array });
      }
  }

  return getData()
  .then((response) => { 

      return response;
  });
})

exports.deleteTimeslot = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).collection('modules').doc(data.moduleID).collection('timeslots').doc(data.timeslotID).delete().then(() => {
      return ({data: 'Document successfully deleted!'});
    });
});

exports.deleteModule = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else{
    const func = async () => {
      const client = require('firebase-tools');
      await client.firestore.delete(`/users/${uid}/modules/${data}/`,{
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        force: true,
        token: functions.config().fb.token,
      })
    }
    return func().then(() => {
      return ({ data: 'Module successfully deleted'});
    });
  }
});


exports.deleteNote = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else
    return admin.firestore().collection('users').doc(uid).collection('modules').doc(data.moduleID).collection('notes').doc(data.noteID).delete().then(() => {
      return ({data: 'Document successfully deleted!'});
    }).catch((error) => {
      console.log(error);
    })
});

exports.deleteUserInfo = functions.region('europe-west2').https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!uid)
    throw new functions.https.HttpsError('no-userid', 'The requested user was not found');
  else {
    const func = async () => {
      console.log("Starting deleting")
      const client = require('firebase-tools');
      await client.firestore.delete(`/users/${uid}/modules`,{
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        force: true,
        token: functions.config().fb.token,
      }).then(() => {
        console.log("deleted modules collection")
      }).catch((error)=>{
        console.log(error);
      })
      await admin.firestore().collection("users").doc(uid).delete();
      console.log("deleted user doc")
      await admin.auth().deleteUser(uid);
    }
    return func().then(()=>{
      return ({ data: 'User successfully deleted!'});
    });
  }
});
