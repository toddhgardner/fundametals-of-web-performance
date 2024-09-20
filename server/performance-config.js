/**
 * Performance Config
 * Fundamentals of Web Performance
 *
 * These are the configuration options we will experiment with in the workshop.
 * They have been extracted to this file for simplicity so you don't have to understand
 * the workings of the server specifics.
 */
module.exports = {

  /**
   * Whether to use basic GZip Compression on response bodies, when supported by
   * the requesting browser.
   */
  useGzipCompression: true,

  /**
   * Whether to use the new Brotli Compression on response bodies, when supported
   * by the requesting browser.
   */
  useBrotliCompression: true

};
