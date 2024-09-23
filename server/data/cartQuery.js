const database = require('./database');

/**
 * Database SQL Statements
 */
const TABLE_NAME = "cartItems";

const selectByUserStatement = database.prepare(`
  SELECT id, t, userId, productId
  FROM ${TABLE_NAME}
  WHERE userId = @userId`);

const insertStatement = database.prepare(`
  INSERT
  INTO ${TABLE_NAME} (userId, productId) VALUES (@userId, @productId)`);

const deleteStatement = database.prepare(`
  DELETE FROM ${TABLE_NAME}
  WHERE id = @cartItemId
  AND userId = @userId`);

const clearStatement = database.prepare(`
  DELETE FROM ${TABLE_NAME}
  WHERE userId = @userId`);

module.exports = {
  getByUser: async ({ userId }) => await selectByUserStatement.all({ userId }),
  insert: async ({ userId, productId }) => await insertStatement.run({ userId, productId }),
  delete: async ({ userId, cartItemId }) => await deleteStatement.run({ userId, cartItemId }),
  deleteAll: async ({ userId }) => await clearStatement.run({ userId })
}
