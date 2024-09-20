/**
 * Example Database
 * Fundamentals of Web Performance
 *
 * Simplified example database for an ecommerce store using SQLite3.
 */
const Sqlite3 = require("better-sqlite3");
const database = new Sqlite3(":memory:");

/**
 * Setup the database from schema. Because it's an in-memory database, we can
 * set it up fresh every time.
 */
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const schema = readFileSync(resolve(__dirname, "schema.sql"), "utf8");
database.exec(schema);

module.exports = database;