const fs = require('fs')
const path = require('path')

const blissPath = path.resolve(__dirname, 'bliss')

const showBlissStat = () => {
  const files = fs.readdirSync(blissPath)

  console.log(files.length)

  const names = files.map(file => file.match(/(.+)\.svg$/i)[1]).join('\n')

  fs.writeFileSync('bliss_names.txt', names, 'utf8')
}

showBlissStat()
