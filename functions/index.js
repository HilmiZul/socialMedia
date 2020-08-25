const functions = require("firebase-functions");
//Read and write Realtime Database data with full admin privileges
const admin = require("firebase-admin");
const { firebaseConfig } = require("firebase-functions");

//implicitly determine your credentials, allowing you to use service account credentials when testing or running in non-Google environments.
admin.initializeApp();

//send response back to the client in json format

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.screams = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection("screams")
    .get()
    .then((querySnapshot) => {
      let screams = [];
      querySnapshot.forEach((doc) => {
        screams.push(doc.data());
      });
      return res.json(screams);
    })
    .catch((error) => console.log(error));
});

exports.createScreams = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }
  const scream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    creatAt: admin.firestore.Timestamp.fromDate(new Date()),
  };
  admin
    .firestore()
    .collection("screams")
    .add(scream)
    .then((doc) => res.json({ message: `${doc.id} created successfully` }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "something went wrong" });
    });
});
