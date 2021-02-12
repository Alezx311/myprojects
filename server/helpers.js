const fs = require('fs')
const path = require('path')

const SAMPLE_FOLDER = path.resolve(__dirname, 'files/samples')
const SAMPLE_NAMES = fs.readdirSync(SAMPLE_FOLDER)

class Files {
  static dirPath = (directory = './', root = SAMPLE_FOLDER) => path.resolve(root, directory)
  static dirContent = (directory = './') => fs.readdirSync(this.dirPath(directory))
  static checkInstrumentName = name => SAMPLE_NAMES.includes(name)

  static loadInfo = name => {
    if (this.checkInstrumentName(name)) {
      const directory = this.dirPath(name)
      const content = this.dirContent(directory)
      const samples = content.filter(obj => obj.extension === '.mp3')
      const names = samples.map(file => path.basename(file, '.mp3'))
      const info = `Instrument Name: ${name}
      Directory: ${directory}
      Files: ${content.length}
      MP3: ${samples.length}
      MP3 Names: ${names.length}`

      return { directory, content, samples, names, info }
    } else {
      return false
    }
  }

  static samplesContent = SAMPLE_NAMES.map(this.loadInfo)
}

console.log('loadInfoResult', Files.dirPath())
console.log('loadInfoResult', Files.dirPath('violin'))
console.log('loadInfoResult', Files.dirPath('sdsdsd'))

module.exports = { Files }
