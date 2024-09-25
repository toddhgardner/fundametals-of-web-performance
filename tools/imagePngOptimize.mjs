/**
 * PNG Optimizer
 * Fundamentals of Web Performance
 *
 * Build tool to optimize the PNG images and place them in the `min` directory.
 *
 * If images have already been resized, the responsive images will be optimized
 * as well.
 *
 * @see https://www.npmjs.com/package/imagemin
 */

import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

console.log("Optimizing PNG Images");

await imagemin(['public/assets/img/**/*.png'], {
  destination: 'public/assets/img/min',
  plugins: [
    imageminPngquant({
      quality: [0.6, 0.8]
    })
  ]
});
