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
   * @see https://developer.mozilla.org/en-US/docs/Glossary/gzip_compression
   */
  enableGzipCompression: false,

  /**
   * Whether to use the Brotli Compression on response bodies, when supported
   * by the requesting browser.
   * @see https://developer.mozilla.org/en-US/docs/Glossary/Brotli_compression
   */
  enableBrotliCompression: false,

  /**
   * Whether to send the 304 Caching Headers `ETag` and `Last-Modified` for
   * static content.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified
   */
  enable304CachingHeaders: false,

  /**
   * Whether to send the Browser Caching Headers `Cache-Control` and `Expires`
   * headers to maintaining the in-browser cache.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
   */
  enableBrowserCache: false,

  /**
   * The expected processing time in milliseconds of a "real" server under load
   * that has to talk to external systems.
   */
  serverDuration: 1_000

};
