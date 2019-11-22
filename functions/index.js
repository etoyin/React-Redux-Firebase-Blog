const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const createNotification = (notification) => {
    return admin.firestore().collection('notifications')
    .add(notification)
    .then((doc) => {
        console.log('notification added', doc);
    })
}

 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 exports.projectCreated = functions.firestore
    .document('posts/{post}')
    .onCreate((doc) => {
        const post = doc.data();
        const notification = {
            content: 'Sent a Post',
            user: `${post.author}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification)
    })