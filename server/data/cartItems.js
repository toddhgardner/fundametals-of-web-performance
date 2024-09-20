const database = require('./database');

/**
 * Database SQL Statements
 */
const TABLE_NAME = "cartItems";

const selectByUser = database.prepare(`
  SELECT cartItemId, productId, productTitle
  FROM ${TABLE_NAME}
  WHERE userId = @userId`);

const insertItem = database.prepare(`
  INSERT OR REPLACE
  INTO ${TABLE_NAME} (userId, productId, productTitle) VALUES (@userId, @productId, @productTitle)`);

const deleteItem = database.prepare(`
  DELETE FROM ${TABLE_NAME}
  WHERE userId = @userId
  AND cartItemId = @cartItemId`);

const deleteAll = database.prepare(`
  DELETE FROM ${TABLE_NAME}
  WHERE userId = @userId`);

module.exports = {
  getByUser: ({ userId }) => selectByUser.all({ userId }),
  update: ({ userId, productId, productTitle }) => insertItem.run({ userId, productId, productTitle }),
  delete: ({ userId, cartItemId }) => deleteItem.run({ userId, cartItemId }),
  deleteAll: ({ userId }) => deleteAll.run({ userId })
}
