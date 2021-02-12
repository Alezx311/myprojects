/* const fs = require('fs')
const path = require('path')

class Files {
  static getPath = p => path.resolve(__dirname, p)
  static getFolderContent = (f = './') => fs.readdirSync(this.getPath(f))
  
  static samplesFolder = this.getPath('files/samples')
  static samplesContent = this.getFolderContent(this.samplesFolder)
  static samplesInfo = `Folder: ${this.samplesFolder}\nContent: ${this.samplesContent}`
  
  static checkInstrument = name => this.samplesContent.includes(name)
  static loadInstrument = name => {
    this.checkInstrument(name)
  }
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
 */