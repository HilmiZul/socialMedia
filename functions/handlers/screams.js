const { db } = require("../util/admin");

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      let screams = [];
      querySnapshot.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          userHandler: doc.data().userHandler,
          body: doc.data().userHandler,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(screams);
    })
    .catch((error) => console.log(error));
};

exports.postOneScream = (req, res) => {
  const scream = {
    body: req.body.body,
    userHandle: req.user.handle, //handle is coming from authentication which is coming from signup
    creatAt: new Date().toISOString(),
  };
  db.collection("screams")
    .add(scream)
    .then((doc) => res.json({ message: `${doc.id} created successfully` }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "something went wrong" });
    });
};
