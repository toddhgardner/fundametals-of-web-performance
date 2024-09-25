/**
 * Example Database
 * Fundamentals of Web Performance
 *
 * Simplified example database for an ecommerce store using SQLite3. We keep it
 * in memory so it resets every time.
 */
const Sqlite3 = require("better-sqlite3");
const database = new Sqlite3(":memory:");

/**
 * Setup the database from schema.
 */
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const schema = readFileSync(resolve(__dirname, "schema.sql"), "utf8");
database.exec(schema);

module.exports = database;