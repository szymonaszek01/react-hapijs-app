const logInfo = (file, message) => console.log(`${new Date()} [INFO] ${file ? `[${file}]` : ''} ${message ?? ''}`);

const logError = (file, message) => console.log(`${new Date()} [ERROR] ${file ? `[${file}]` : ''} ${message ?? ''}`);

const logWarn = (file, message) => console.log(`${new Date()} [WARN] ${file ? `[${file}]` : ''} ${message ?? ''}`);

module.exports = {
  logInfo,
  logError,
  logWarn,
};