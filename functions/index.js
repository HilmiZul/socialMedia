const functions = require("firebase-functions");
//Read and write Realtime Database data with full admin privileges
const { getAllScreams, postOneScream } = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthUserDetails,
  getScream,
  commentScream,
} = require("./handlers/users");
const Auth = require("./util/Auth");
//implicitly determine your credentials, allowing you to use service account credentials when testing or running in non-Google environments.

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//screams routes
app.get("/screams", getAllScreams);
app.post("/scream", Auth, postOneScream);
app.get("/scream/:screamId", getScream);
app.post("/scream/:screamId/comment", Auth, commentScream);
//Delete scream, like a scream, unlike a scream, comment on scream,
//users routes

app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", Auth, uploadImage);
app.post("/user", Auth, addUserDetails);
app.get("/user", Auth, getAuthUserDetails);
exports.api = functions.https.onRequest(app);
