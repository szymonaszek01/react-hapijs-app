const db = require('../configs/db.config');

const dbGet = async (query, parameters) => {
  return new Promise((resolve, reject) => {
    db.get(query, parameters, (error, row) => {
      if (error) {
        reject(error);
      } else if (row) {
        resolve(row);
      } else {
        reject(`object (${parameters.at(0)}) not found`);
      }
    });
  });
};

const dbAll = async (query) => {
  return new Promise((resolve, reject) => {
    db.all(query, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

const dbRun = async (query, parameters) => {
  return new Promise((resolve, reject) => {
    db.run(query, parameters, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(this.lastID || this.changes);
      }
    });
  });
};

const dbRunWithTransaction = async (query, parameters) => {
  return new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', (error) => {
      if (error) {
        reject(error);
      } else {
        db.run(query, parameters, (error) => {
          if (error) {
            db.run('ROLLBACK', () => reject(error));
          } else {
            db.run('COMMIT', () => resolve(this.lastID || this.changes));
          }
        });
      }
    });
  });
};

module.exports = {
  dbGet,
  dbAll,
  dbRun,
  dbRunWithTransaction,
};