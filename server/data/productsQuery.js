const database = require('./database');

/**
 * Database SQL Statements
 */
const TABLE_NAME = "products";

const getAllStatement = database.prepare(`
  SELECT id, slug, name, description, imagePath
  FROM ${TABLE_NAME}`);

module.exports = {
  getAll: async () => await getAllStatement.all()
};

