/**
 * Example Web Server
 * Fundamentals of Web Performance
 *
 * Simple static content webserver to illustrate the performance impact of HTTP
 * protocol, headers, delays, and compression on the overall user experience of
 * a website.
 */
const express = require("express");
const { resolve } = require("path");
const compression = require("http-compression");
const api = require("./routes/api");
const performanceConfig = require("./performance-config");

const webServer = express();

/**
 * Compression of response bodies.
 * @see https://www.npmjs.com/package/http-compression
 */
webServer.use(compression({
  threshold: 1, // so we can always see it for testing.
  gzip: performanceConfig.useGzipCompression,
  brotli: performanceConfig.useBrotliCompression
}));

webServer.use("/api", api);

/**
 * Host static assets in the ./public directory
 * @see https://expressjs.com/en/5x/api.html#express.static
 */
webServer.use(express.static(resolve(__dirname, "..", "public"), {
  extensions: ["html"],

  /**
   * Disable built-in `etag` asset caching header.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
   */
  etag: false,

  /**
   * Disable the built-in LastModified date header from the filesystem
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified
   */
  lastModified: false
}));

module.exports = webServer;

