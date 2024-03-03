const { dbRunWithTransaction, dbGet } = require('./database.handler');
const { http } = require('../configs/http.config');
const { logInfo, logError } = require('./log.handler');
const { encodePassword } = require('./auth.handler');

const file = 'user.handler.js';

const createUser = async (request, h) => {
  const { email, password, firstname, lastname, age, phone_number } = request.payload;
  let body = {};
  let code = 0;

  const encodedPassword = await encodePassword(password);
  const query = 'INSERT INTO user(email, password, firstname, lastname, age, phone_number) VALUES (?, ?, ?, ?, ?, ?);';
  const parameters = [email, encodedPassword.hash, firstname, lastname, age, phone_number];
  await dbRunWithTransaction(query, parameters)
    .then(() => {
      const message = `user (${email}) created successfully`;
      logInfo(file, message);
      code = http.created.statusCode;
      body = { ...http.created, message: message };
    })
    .catch((error) => {
      const message = `unable to create user (${email}) - ${error}`;
      logError(file, message);
      code = http.bad_request.statusCode;
      body = { ...http.bad_request, message: message };
    });

  return h.response(body).code(code);
};

const getUserById = async (request, h) => {
  const { id } = request.params;
  let body = {};
  let code = 0;

  const query = 'SELECT * FROM user WHERE id = ?';
  const parameters = [id];
  await dbGet(query, parameters)
    .then((row) => {
      const message = `user (${id}) loaded successfully`;
      logInfo(file, message);
      code = http.ok.statusCode;
      body = { ...http.ok, data: row };
    })
    .catch((error) => {
      const message = `unable to load user (${id}) - ${error}`;
      logError(file, message);
      code = http.not_found.statusCode;
      body = { ...http.not_found, message: message };
    });

  return h.response(body).code(code);
};

const getUserByEmail = async (request, h) => {
  const { email } = request.params;
  let body = {};
  let code = 0;

  const query = 'SELECT * FROM user WHERE email = ?';
  const parameters = [email];
  await dbGet(query, parameters)
    .then((row) => {
      const message = `user (${email}) loaded successfully`;
      logInfo(file, message);
      code = http.ok.statusCode;
      body = { ...http.ok, data: row };
    })
    .catch((error) => {
      const message = `unable to load user (${email}) - ${error}`;
      logError(file, message);
      code = http.not_found.statusCode;
      body = { ...http.not_found, message: message };
    });

  return h.response(body).code(code);
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};