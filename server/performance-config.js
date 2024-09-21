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
  useGzipCompression: false,

  /**
   * Whether to use the new Brotli Compression on response bodies, when supported
   * by the requesting browser.
   */
  useBrotliCompression: false,

  /**
   * The expected processing time in milliseconds of a "real" server under load
   * that has to talk to external systems.
   */
  serverDuration: 100,

  /**
   * The network latency in milliseconds to simulate on requests. This is based
   * on how far your users are from your services.
   * @see https://wondernetwork.com/pings
   */
  latency: 0,

};
