/**
 * API Server
 * Fundamentals of Web Performance
 *
 * This is an example API server that hosts the API on it's own origin. This
 * demonstrates balancing a cookie-less API domain vs the connection and CORS
 * overhead
 */
const express = require("express");
const compression = require("http-compression");
const cors = require("cors");
const api = require("./routes/api");
const performanceConfig = require("./performance-config");

const apiServer = express();

/**
 * Compression of response bodies.
 * @see https://www.npmjs.com/package/http-compression
 */
apiServer.use(compression({
  threshold: 1, // so we can always see it for testing.
  gzip: performanceConfig.useGzipCompression,
  brotli: performanceConfig.useBrotliCompression
}));

/**
 * Cross-Origin-Resource-Sharing Headers
 * Allows a browser to access content on a different origin from the website.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
apiServer.use(cors({
  origin: "http://devstickers.localhost:3000",
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Location"]
}));

apiServer.use(api);


module.exports = apiServer;
