const functions = require("firebase-functions");
//Read and write Realtime Database data with full admin privileges
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

//implicitly determine your credentials, allowing you to use service account credentials when testing or running in non-Google environments.
admin.initializeApp();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      let screams = [];
      querySnapshot.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          userHandler: doc.data().userHandler,
          body: doc.data().userHandler.body,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(screams);
    })
    .catch((error) => console.log(error));
});

app.post("/screams", (req, res) => {
  const scream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    creatAt: new Date().toISOString(),
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

exports.api = functions.https.onRequest(app);
