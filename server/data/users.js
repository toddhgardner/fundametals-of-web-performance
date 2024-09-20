const database = require('./database');

/**
 * Database SQL Statements
 */
const TABLE_NAME = "users";

const selectUserById = database.prepare(`
  SELECT userId, name, createdOn
  FROM ${TABLE_NAME}
  WHERE userId = @userId`);

const insertUser = database.prepare(`
  INSERT INTO ${TABLE_NAME} (name) VALUES (@name)`);

module.exports = {
  create: ({ name }) => insertUser.run({ name }),
  getById: ({ userId }) => selectUserById.get({ userId })
}
