const http = {
  ok: { statusCode: 200 },
  created: { statusCode: 201 },
  bad_request: { statusCode: 400, error: 'bad request' },
  not_found: { statusCode: 404, error: 'not found' },
};

module.exports = {
  http,
};