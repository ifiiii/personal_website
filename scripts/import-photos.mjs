// Copies photos into public/images/<folder>/ as web-sized .jpg files.
// Strips all metadata (including GPS location) and applies the camera's rotation.
//
// Usage: node scripts/import-photos.mjs "<source folder>" [ramen|guide]

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [source, folder = "ramen"] = process.argv.slice(2);
if (!source) {
  console.error('Usage: node scripts/import-photos.mjs "<source folder>" [ramen|guide]');
  process.exit(1);
}

const outDir = path.join("public", "images", folder);
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(source).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f));
for (const file of files) {
  const name = path.parse(file).name.toLowerCase() + ".jpg";
  await sharp(path.join(source, file))
    .rotate() // apply EXIF orientation before metadata is dropped
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(outDir, name));
  console.log(`${file} -> ${path.join(outDir, name)}`);
}
console.log(`Imported ${files.length} photo(s).`);
