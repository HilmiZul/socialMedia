const { db, admin } = require("./admin");

//Authentication
module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    //getting back the token that put in the header authentication
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      // decodedToken {
      //   >    iss: 'https://securetoken.google.com/xinyu-react-social',
      //   >    aud: 'xinyu-react-social',
      //   >    auth_time: 1598490714,
      //   >    user_id: 'mvGroGTXL3QbcBFuflSuJ3v16882',
      //   >    sub: 'mvGroGTXL3QbcBFuflSuJ3v16882',
      //   >    iat: 1598490714,
      //   >    exp: 1598494314,
      //   >    email: 'xinyu.tang061433@gmail.com',
      //   >    email_verified: false,
      //   >    firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
      //   >    uid: 'mvGroGTXL3QbcBFuflSuJ3v16882'
      //   >  }
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      // data.docs[0].data() {
      //   >    createdAt: '2020-08-27T01:29:51.462Z',
      //   >    handle: 'user12',
      //   >    userId: 'WxPZWX1m40ZjEB0zdnGndHQfEUE2',
      //   >    email: 'deiii@gmail.com'
      //   >  }
      req.user.handle = data.docs[0].data().handle;
      req.user.imageUrl = data.docs[0].data().imageUrl;
      return next();
    })
    .catch((err) => {
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ error: "wrong credentials, please try again" });
      }

      return res.status(403).json({ err: err.code });
    });
};
