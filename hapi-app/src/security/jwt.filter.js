const { dbGet } = require('../handlers/database.handler');
const { logInfo, logError } = require('../handlers/log.handler');
const file = 'jwt.filter.js';
const secretKey = 'test123';

const jwtFilter = {
  key: secretKey,
  validate: async (decoded, request) => {
    const { userId, roles, exp } = decoded;

    const currentTime = Date.now();
    const expirationTime = exp * 1000;
    if (currentTime > expirationTime) {
      return { isValid: false };
    }

    let user = null;
    const query = 'SELECT * FROM user WHERE id = ?';
    const parameters = [userId];
    await dbGet(query, parameters)
      .then((row) => {
        logInfo(file, `user (${userId}) from token is valid`);
        user = row;
      })
      .catch((error) => {
        const message = `unable to load user (${userId}) from token - ${error}`;
        logError(file, message);
      });

    if (user) {
      return { isValid: true, credentials: { scope: roles } };
    }

    return { isValid: false };
  },
  verifyOptions: { algorithms: ['HS256'] },
};

module.exports = {
  jwtFilter,
};