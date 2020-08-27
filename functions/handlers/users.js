const { db } = require("../util/admin");
const firebase = require("firebase");
const firebaseConfig = require("../util/config");
firebase.initializeApp(firebaseConfig);
const { validateSignUp, validateLogin } = require("../util/validator");

let token, userId;
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirm: req.body.confirm,
    handle: req.body.handle,
  };
  const { errors, valid } = validateSignUp(newUser);
  console.log("signup errors", errors);
  if (!valid) {
    return res.status(400).json({ errors });
  }
  db.doc(`users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ message: "handle exists" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((file) => {
      userId = file.user.uid;
      return file.user.getIdToken();
    })
    .then((t) => {
      token = t;

      const userConfig = {
        email: newUser.email,
        handle: newUser.handle,
        createdAt: new Date().toISOString(),
        userId,
      };
      db.doc(`users/${userConfig.handle}`).set(userConfig);

      return res.status(201).json({ token });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { errors, valid } = validateLogin(user);

  if (!valid) {
    return res.status(400).json({ errors });
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((file) => file.user.getIdToken())
    .then((token) => res.json({ token }))
    .catch((err) => {
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again" });
      } else {
        return res.status(500).json({ message: err.message });
      }
    });
};
