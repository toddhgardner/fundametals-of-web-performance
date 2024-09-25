/**
 * PNG Resizer
 * Fundamentals of Web Performance
 *
 * Build tool to generate responsive sizes for all the images on the size and
 * put in the `r` directory.
 * @see https://jimp-dev.github.io/jimp/
 */

import { parse } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { Jimp } from "jimp";
import { glob } from "glob";

const filePaths = await glob('public/assets/img/*.png')
const widths = [360, 720, 1024, 1400, 2800];

console.log("Generating Responsive Images");

await mkdir(`public/assets/img/r`, { recursive: true });

filePaths.forEach(async (path) => {
  widths.forEach(async (width) => {
    const sourcePath = parse(path);
    const file = await Jimp.read(path);
    const resizedFile = await file.resize({ w: width });
    await resizedFile.write(`public/assets/img/r/${sourcePath.name}-${width}${sourcePath.ext}`);
  });
});

