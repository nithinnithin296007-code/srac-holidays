// One-off script: converts all JPG/PNG car images to WebP at quality 80
// Run with: node scripts/convert-images.mjs
import sharp from 'sharp'
import { readdir, unlink, rename } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const carsDir = join(__dirname, '../src/assets/cars')

const files = await readdir(carsDir)

for (const file of files) {
  const ext = extname(file).toLowerCase()
  if (ext === '.webp') {
    console.log(`⏭  Skipping already WebP: ${file}`)
    continue
  }
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

  const inputPath = join(carsDir, file)
  const outputName = basename(file, ext) + '.webp'
  const outputPath = join(carsDir, outputName)

  try {
    const info = await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)

    const inputStat = (await import('fs')).statSync(inputPath)
    const savings = (((inputStat.size - info.size) / inputStat.size) * 100).toFixed(1)
    console.log(`✅ ${file} → ${outputName}  (${(inputStat.size/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB, ${savings}% smaller)`)
  } catch (err) {
    console.error(`❌ Failed: ${file}`, err.message)
  }
}

console.log('\nDone! Remember to update import paths in CarRentals.jsx and FortunerModel.jsx.')
