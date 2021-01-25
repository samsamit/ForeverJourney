const admin = require('firebase-admin').initializeApp();
export const db = admin.firestore();
module.exports = {admin, db};
