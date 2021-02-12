const fs = require('fs')
const path = require('path')

const getPath = p => path.resolve(__dirname, p)
const getFolderContent = f => fs.readdirSync(getPath(f))
const isFolder = p => fs.lstatSync(getPath(p)).isDirectory()
const getFileData = f => {
  const ext = path.extname(f)
  const name = path.basename(f, ext)
  const filepath = path.resolve(__dirname, f)

  return { ext, name, filepath }
}

const getSamplesInfo = () => {
  const samplesInfo = getFolderContent(__dirname).map(v => {
    if (isFolder(v) !== true) {
      return null
    }

    const dirName = v
    const dirContent = getFolderContent(v)
    const dirContentAudio = dirContent.filter(file => file.match(/\.mp3|ogg|wav$/))
    const dirContentNames = dirContent.map(v => getFileData(v).name)
    const dirContentNamesUnicals = [...new Set([...dirContentNames])]

    const info = `Folder: ${dirName}
Files In Folder: ${dirContent.length ?? 'Invalid...'}
Audio In Folder: ${dirContentAudio.length ?? 'Invalid...'}
Note Files Finded: ${dirContentNamesUnicals.length}
Notes In Folder: ${dirContentNamesUnicals.join(',')}
`

    return info
  })

  const info = `Samples Folder Info:
Folders: ${samplesInfo.length}
Folders Stat:
----------
${samplesInfo.join('\n----------\n')}`

  return info
}

console.log(getSamplesInfo())
