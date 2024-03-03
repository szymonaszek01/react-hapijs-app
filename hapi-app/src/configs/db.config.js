const sqlite3 = require('sqlite3').verbose();

const databaseConfig = {
  dialect: 'sqlite',
  name: 'car-rent',
  storage: 'C:/Users/szymo/VsCodeProjects/react-hapijs-app/hapi-app/database/car-rent.db',
};

let db = new sqlite3.Database(databaseConfig.storage, sqlite3.OPEN_READWRITE, (error) => {
  if (error) {
    console.error(`Unable to connect to the database '${databaseConfig.name}'`, error);
  } else {
    console.log(`Connected to the database \'${databaseConfig.name}\' successfully`);
  }
});

module.exports = db;