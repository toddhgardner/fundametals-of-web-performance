/**
 *
 */

const express = require("express");
const { resolve } = require("path");

const app = express();

/**
 * Host static assets in the ./public directory
 */
app.use(express.static(resolve(__dirname, "public"), {
  extensions: ["html"]
}));

/**
 * Start the application
 */
app.listen(3000, () => {
  console.log("Application is ready at http://localhost:3000/");
});