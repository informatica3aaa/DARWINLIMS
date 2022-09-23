'use strict';

/**
 * Constants
 */
var DIGEST = 'sha1';
var ENCODING = 'hex';

/**
 * Module dependencies
 */
const crypto = require('crypto');


/**
 * Creates a hash from a given password
 *
 * @param {String} password
 */
 function hashPromise(password) {
   return new Promise((resolve, reject) => {
     const shasum = crypto.createHash(DIGEST);
     shasum.update(password);
     const sha1hash = shasum.digest(ENCODING)
     resolve({
       encrypted_password: sha1hash
     });
   })
 }

/**
 * Verifies if a password matches a hash by hashing the password
 *
 * @param {String} password
 * @param {String} hash
 */
function verifyPromise(password, hash) {
  return new Promise((resolve, reject) => {
    const shasum = crypto.createHash(DIGEST);
    shasum.update(password);
    const sha1hash = shasum.digest(ENCODING)
    if(sha1hash == hash) {
      resolve(true);
    }
    else {
      resolve(false);
    }
  });
}

/**
 * Module exports
 */
export default { hash: hashPromise, verify: verifyPromise }
