const sharp = require('sharp')
// const imagemin = require('imagemin');
// const imageminGifsicle = require('imagemin-gifsicle');
const fs = require('fs')

const assetDir = __dirname + '/../docs/public/assets/original'
const compressedDir = __dirname + '/../docs/public/assets/compressed'

const regex = {
  file: /^(.+)\.(\w+)$/
}

;(async function() {
  console.log('Compressing images and gifs')
  await recursiveCompress('')
  console.log('Done compressing')
})()

async function recursiveCompress(parent) {
  await compressDir(parent)

  const dirs = await getDirs(`${assetDir}/${parent}`)

  if (!fs.existsSync(compressedDir)) {
    fs.mkdirSync(compressedDir)
  }

  for (const dir of dirs) {
    await recursiveCompress(`${parent}/${dir}`)
  }
}

async function compressDir(dir) {
  // Check if directory exists in compressed folder. If not, make it
  if (!fs.existsSync(`${compressedDir}/${dir}`)) {
    fs.mkdirSync(`${compressedDir}/${dir}`)
  }

  const files = await getFiles(`${assetDir}/${dir}`)

  // Loop through all files in dir
  for (const file of files) {
    const match = file.match(regex.file)
    if (!match) continue
    const [, fileName, format] = match

    // If file type is a match
    if (/png|jpg|jpeg|gif/i.test(format)) {
      if (fs.existsSync(`${compressedDir}${dir}/${fileName}.jpg`)) {
        continue
      }

      let image = await sharp(`${assetDir}/${dir}/${file}`)
      const data = await image.metadata()

      // If needs to be compressed
      let { width, height } = data
      if (width > 450) {
        const ratio = 450 / width
        width *= ratio
        height *= ratio
      }
      if (height > 450) {
        const ratio = 450 / height
        width *= ratio
        height *= ratio
      }

      // Convert from float to int
      width = parseInt(width)
      height = parseInt(height)

      // If needs resizing
      if (width < data.width || height < data.height) {
        image = await image.resize(width, height)
      }

      await image
        .toFormat('jpeg')
        .toFile(`${compressedDir}/${dir}/${fileName}.jpg`)
    }

    // If file type is gif, compress
    // if (/gif/i.test(format)) {
    //   if (fs.existsSync(`${compressedDir}${dir}/${fileName}.gif`)) {
    //     continue;
    //   }

    //   await imagemin(
    //     [`docs/.vuepress/public/assets/original/${dir}/${fileName}.gif`],
    //     {
    //       destination: `docs/.vuepress/public/assets/compressed/${dir}`,
    //       plugins: [
    //         imageminGifsicle({
    //           optimizationLevel: 3,
    //           colors: 128
    //         })
    //       ]
    //     }
    //   );
    // }

    console.log(`- Compressed ${dir}/${file}`)
  }
}

// Get all directories by directory name
function getDirs(dirname) {
  return fs
    .readdirSync(dirname, {
      withFileTypes: true
    })
    .filter(item => item.isDirectory())
    .map(item => item.name)
}

// Get all files by directory name
function getFiles(dirname) {
  return fs
    .readdirSync(dirname, {
      withFileTypes: true
    })
    .filter(item => !item.isDirectory())
    .map(item => item.name)
}
