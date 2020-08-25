const functions = require("firebase-functions");
//Read and write Realtime Database data with full admin privileges
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");

//implicitly determine your credentials, allowing you to use service account credentials when testing or running in non-Google environments.
admin.initializeApp();
const db = admin.firestore();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/screams", (req, res) => {
  db.collection("screams")
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
  db.collection("screams")
    .add(scream)
    .then((doc) => res.json({ message: `${doc.id} created successfully` }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "something went wrong" });
    });
});

//firebase App

var firebaseConfig = {
  apiKey: "AIzaSyCh6yLCgz7xwLYdJPHR6r_PxARm84EYpyQ",
  authDomain: "xinyu-react-social.firebaseapp.com",
  databaseURL: "https://xinyu-react-social.firebaseio.com",
  projectId: "xinyu-react-social",
  storageBucket: "xinyu-react-social.appspot.com",
  messagingSenderId: "498666966213",
  appId: "1:498666966213:web:87c17de9cf150707af34ac",
};

firebase.initializeApp(firebaseConfig);

app.post("/signUp", (req, resp) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirm: req.body.confirm,
    handle: req.body.handle,
  };
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return resp.status(400).json({ message: "handle exists" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })

    .then((data) => data.user.getIdToken())
    .then((token) => resp.status(201).json({ token }))
    .catch((err) => resp.status(500).json({ message: err.code }));
});

exports.api = functions.https.onRequest(app);
