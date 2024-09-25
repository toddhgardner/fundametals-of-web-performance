const database = require('./database');

/**
 * Database SQL Statements
 */
const TABLE_NAME = "users";

const selectByIdStatement = database.prepare(`
  SELECT id, t, name
  FROM ${TABLE_NAME}
  WHERE id = @userId`);

const insertStatement = database.prepare(`
  INSERT INTO ${TABLE_NAME} (name) VALUES (@name)`);

module.exports = {
  create: async ({ name }) => await insertStatement.run({ name }),
  getById: async ({ userId }) => await selectByIdStatement.get({ userId })
};
