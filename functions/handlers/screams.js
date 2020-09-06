const { db } = require("../util/admin");

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .get()
    .then((querySnapshot) => {
      let screams = [];
      querySnapshot.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          userHandle: doc.data().userHandle,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          userImage: doc.data().userImage,
        });
      });
      return res.json({ screams });
    })
    .catch((error) => console.log(error));
};

exports.postOneScream = (req, res) => {
  const scream = {
    body: req.body.body,
    userHandle: req.user.handle, //handle is coming from authentication which is coming from signup
    createdAt: new Date().toISOString(),
    userImage: req.user.imageUrl,
    likeCount: 0,
    commentCount: 0,
  };
  db.collection("screams")
    .add(scream)
    .then((doc) => {
      const newScream = scream;
      newScream.screamId = doc.id;
      return res.json({ newScream });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "something went wrong" });
    });
};

exports.getScream = (req, res) => {
  let screamData = {};
  db.doc(`screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection("comments")
        .where("screamId", "==", req.params.screamId)
        .get();
    })
    .then((data) => {
      screamData.comments = [];
      data.forEach((element) => {
        screamData.comments.push(element.data());
      });
      return res.json({ screamData });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "something went wrong" });
    });
};

exports.commentScream = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ error: "must not be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
  };

  db.doc(`screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      return res.json(newComment);
    })
    .catch((error) => {
      console.error(error);
      return res.json({ error: error.code });
    });
};

// // Like a scream
exports.likeScream = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        //exits for data snapshot
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        //empty for query snapshot
        return db
          .collection("likes")
          .add({
            screamId: req.params.screamId,
            userHandle: req.user.handle,
          })
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
      } else {
        return res.status(400).json({ error: "Scream already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Like a scream
exports.unLikeScream = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Scream not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteScream = function (req, res) {
  return db
    .doc(`/screams/${req.params.screamId}`)
    .delete()
    .then(() => {
      console.log("delete successfully");
      return res.json({ message: "delete successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
};
