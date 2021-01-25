"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const admin = require('firebase-admin').initializeApp();
exports.db = admin.firestore();
module.exports = { admin, db: exports.db };
//# sourceMappingURL=admin.js.map