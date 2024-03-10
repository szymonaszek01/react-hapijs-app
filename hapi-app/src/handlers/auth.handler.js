const { logError, logInfo } = require('./log.handler');
bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { http } = require('../configs/http.config');
const { dbGet, dbRun, dbRunWithTransaction } = require('./database.handler');

const file = 'auth.handler.js';
const bearer = 'Bearer ';
const secretKey = 'test123';

const encodePassword = async (password) => {
  let result = {};
  await bcrypt.hash(password, 10)
    .then(hash => {
      const message = `password encoded successfully (${password}) - ${hash}`;
      logInfo(file, message);
      result = {
        password: password,
        hash: hash,
      };
    })
    .catch(error => {
      const message = `unable to encode password (${password}) - ${error}`;
      logError(file, message);
      result = {
        password: password,
        error: error,
      };
    });

  return result;
};

const comparePassword = async (password, hash) => {
  let result = {};

  await bcrypt.compare(password, hash)
    .then(match => {
      const message = `provided password (${password}) ${match ? 'match' : 'does not match'} to hash (${hash})`;
      logInfo(file, message);
      result = {
        password: password,
        hash: hash,
        match: match,
      };
    })
    .catch(error => {
      const message = `error occurred when comparing provided password (${password}) and hash (${hash}) - ${error}`;
      logError(file, message);
      result = {
        password: password,
        hash: hash,
        match: false,
      };
    });

  return result;
};

const isValidJwt = (request, h) => {
  let result = {};
  const token = request.headers['authorization'];

  if (token && token.startsWith(bearer)) {
    jwt.verify(token.substring(7), secretKey, (error, decoded) => {
      if (error) {
        const message = 'Jwt is not valid or expired';
        logError(file, message);
        result = { error: message, valid: false };
      } else {
        const { userId, role } = decoded;
        logInfo(file);
        result = { user: { id: userId, role: role }, valid: true };
      }
    });
  } else {
    result = { error: 'Jwt not provided or invalid token signature', valid: false };
  }

  return result;
};

const createJwt = ({ userId, role }) => {
  const token = jwt.sign({ userId, role }, secretKey, { expiresIn: '15m' });
  const message = `generated jwt (${token}) for user (${userId})`;
  logInfo(file, message);
  return token;
};

const signIn = async (request, h) => {
  const { email, password } = request.payload;
  let body = {};
  let code = 0;
  let userId = undefined;
  let passwordHash = undefined;

  const query = 'SELECT * FROM user WHERE email = ?';
  const parameters = [email];
  await dbGet(query, parameters)
    .then(row => {
      userId = row.id;
      passwordHash = row.password;
    })
    .catch((error) => {
      const message = `unable to load user (${email}) - ${error}`;
      logError(file, message);
      code = http.not_found.statusCode;
      body = { ...http.not_found, message: message };
    });

  if (userId && passwordHash) {
    await comparePassword(password, passwordHash)
      .then((result) => {
        if (result.match) {
          const token = createJwt({ userId: userId, role: 'user' });
          const message = `user (${userId}) signed in successfully`;
          logInfo(file, message);
          code = http.ok.statusCode;
          body = { ...http.ok, token: token };
        } else {
          const message = `provided password (${password}) for user (${userId}) is invalid`;
          logInfo(file, message);
          code = http.not_found.statusCode;
          body = { ...http.not_found, message: message };
        }
      });
  }

  return h.response(body).code(code);
};

const signUp = async (request, h) => {
  const { email, password, phone_number, firstname, lastname, age } = request.payload;
  let body = {};
  let code = 0;
  let userId = undefined;
  let hash = undefined;
  let failed = false;

  let query = 'SELECT * FROM user WHERE email = ?';
  let parameters = [email];
  await dbGet(query, parameters)
    .then(row => {
      userId = row.id;
      failed = true;
    })
    .catch(error => {
      const message = `unable to load user (${email}) - ${error}`;
      logError(file, message);
      code = http.not_found.statusCode;
      body = { ...http.not_found, message: message };
    });

  if (!failed) {
    await encodePassword(password)
      .then(result => hash = result.hash)
      .catch(() => failed = true);
  }

  if (!failed) {
    query = 'INSERT INTO user(email, password, firstname, lastname, age, phone_number) VALUES(?, ?, ?, ?, ?, ?)';
    parameters = [email, hash, firstname, lastname, age, phone_number];
    await dbRunWithTransaction(query, parameters)
      .then(() => {
        const message = `user created (${email}) successfully`;
        logInfo(file, message);
      })
      .catch(error => {
        const message = `unable to create user (${email}) - ${error}`;
        logError(file, message);
        code = http.bad_request.statusCode;
        body = { ...http.bad_request, message: message };
      });

    query = 'SELECT * FROM user WHERE email = ?';
    parameters = [email];
    await dbGet(query, parameters)
      .then(row => {
        userId = row.id;
        const token = createJwt({ userId: userId, role: 'user' });
        const message = `user (${userId}) signed in successfully`;
        logInfo(file, message);
        code = http.ok.statusCode;
        body = { ...http.ok, token: token };
      });
  } else {
    const message = `unable to creat user (${email}) - user (${userId}) exists`;
    logError(file, message);
    code = http.forbidden.statusCode;
    body = { ...http.forbidden, message: message };
  }

  return h.response(body).code(code);
};

module.exports = {
  encodePassword,
  comparePassword,
  isValidJwt,
  createJwt,
  signIn,
  signUp,
};