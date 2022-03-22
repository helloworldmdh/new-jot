const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('cors')({origin: true});
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


// exports.posttime = functions.https.onCall((data, context) => {
//     const uid = context.auth.uid;
//     if(!uid)
//         throw new functions.https.HttpsError('no-userid', 'The requested user wasnot found');
//     else
//         return admin.firestore().collection('comments').add({ 
//             timeslot: data.body.data.timeslot, 
//             uid: data.body.data.uid }).then(()=> {
//             data.send({"data": "Saved in Database"});
//         });

// });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.authSignUp = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection('users').doc(user.uid).set({
    // default values when the user signs up
    email: user.email,
    alias: user.email, 
    comments: [],
    timeStudied: 0,
  })
});

exports.authDelete = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection('users').doc(user.uid).delete();
});