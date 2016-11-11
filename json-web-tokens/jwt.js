/*
Implementing JSON web tokens

Ref:  https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
      https://stormpath.com/blog/jwt-the-right-way
      http://jonatan.nilsson.is/stateless-tokens-with-jwt/
      https://float-middle.com/json-web-tokens-jwt-vs-sessions/
      ** Look at this again post MVP **
      http://yos.io/2016/01/07/stateless-authentication-with-json-web-tokens/
*/

// First cut code for JWT encryption and authentication
// btoa and signatureCreatingFunction would need further implementation

'use strict';

const encrypt = (segment) => btoa(JSON.stringify(segment));

// makeJWT function creates token in header-payload-signature format
const makeJWT = (userData) => {
  const header = {  
    // The signing algorithm.
    alg: 'HS256',
    // The type (typ) property says it's "JWT",
    // because with JWS you can sign any type of data.
    typ: 'JWT'
  };
  // Base64 representation of the header object.
  const headerB64 = encrypt(header);
  // Base64 representation of the payload object.
  const payloadB64 = encrypt(userData);
  // The signature is calculated on the base64 representation
  // of the header and the payload.
  const signature = signatureCreatingFunction(headerB64 + '.' + payloadB64);
  // Base64 representation of the signature.
  const signatureB64 = btoa(signature);
  // Finally, the whole JWS - all base64 parts glued together with a '.'
  const jwt = headerB64 + '.' + payloadB64 + '.' + signatureB64;
  return jwt;
};

// authenticate function checks if signature created matches encryption algorithm
const authenticate = (jwt) => {
  const [headerB64, payloadB64, signatureB64] = jwt.split('.');
  if (atob(signatureB64) === signatureCreatingFunction(headerB64 + '.' + payloadB64)) {  
      // good
      return true;
  } else {
      // no good
      return false;
  }
};