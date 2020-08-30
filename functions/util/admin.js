const admin = require("firebase-admin"); //implicitly determine your credentials, allowing you to use service account credentials when testing or running in non-Google environments.
admin.initializeApp();
const db = admin.firestore();

module.exports = { admin, db };
db.settings({ ignoreUndefinedProperties: true });
