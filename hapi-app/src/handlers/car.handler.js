const { logInfo, logError } = require('./log.handler');
const { http } = require('../configs/http.config');
const { dbAll } = require('./database.handler');
const { isValidJwt } = require('./auth.handler');

const file = `car.handler.js`;

const getCars = async (request, h) => {
  let body = {};
  let code = 0;

  const jwtResult = isValidJwt(request);
  if (!jwtResult.valid) {
    const message = `unable to load cars - ${jwtResult.error}`;
    logError(file, message);
    return h.response({ ...http.unauthorized, message: message }).code(http.unauthorized.statusCode);
  }

  const query = `SELECT car.*, category.name AS category_name FROM car INNER JOIN category ON car.category_id = category.id`;
  await dbAll(query)
    .then((rows) => {
      const message = `cars loaded successfully`;
      logInfo(file, message);
      console.log(rows);
      code = http.ok.statusCode;
      body = { ...http.ok, data: rows };
    })
    .catch((error) => {
      const message = `unable to load cars - ${error}`;
      logError(file, message);
      code = http.not_found.statusCode;
      body = { ...http.not_found, message: message };
    });

  return h.response(body).code(code);
};

module.exports = {
  getCars
}