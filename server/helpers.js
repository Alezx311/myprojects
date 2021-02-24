const FILES = fs.readdirSync('bliss')

class Bliss {
  static blissPath = () => path.resolve(__dirname, 'bliss')
  static list = () =>
    FILES.map(file => {
      const [filename, name, ext] = file.match(/$(.+)(\.[a-z])$/i)
      return name
    }).filter(Boolean)
  static findByWords = words => {
    const list = this.list()
    const inputs = words.filter(word => list.includes(word)).map(word => `${word}.svg`)

    return inputs
  }
}

module.exports = { FILES, Bliss }
