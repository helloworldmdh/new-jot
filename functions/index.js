// const functions = require("firebase-functions");
// const admin = require('firebase-admin');
// //const cors = require('cors')({origin: true});
// admin.initializeApp();

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
