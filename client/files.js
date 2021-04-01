const Meyda = require('meyda')
const Tone = require('tone')

const fs = require('fs')
const { promises: fsPromises } = fs
const path = require('path')
const allFilesDir = path.resolve(__dirname, './public')
const audioFilesDir = path.resolve(allFilesDir, 'notes/')

const allFiles = fs.readdirSync(allFilesDir, { encoding: 'utf8' })
const audioFiles = fs.readdirSync(audioFilesDir, { encoding: 'utf8' }).filter(v => v.match(/.mp3|ogg$/i))

console.debug(`allFiles: ${allFiles}`)
console.debug(`audioFiles: ${audioFiles}`)

async function saveLog(data) {
  const time = new Date()
  if (!data) {
    await fsPromises.appendFile('./analyzerLog.txt', `\n${time} -> started\n`, { encoding: 'utf8' })
  } else {
    await fsPromises.appendFile('./analyzerLog.txt', `\n${time} -> ${data}\n`, { encoding: 'utf8' })
  }
}

const signal = new Array(32).fill(0).map((element, index) => {
  const reminder = index % 3

  if (reminder === 0) {
    return 1
  } else if (reminder === 1) {
    return 0
  }
  return -1
})
const extracted = Meyda.extract('zcr', signal)

const analyzer = Meyda.createMeydaAnalyzer({
  audioContext: audioContext,
  source: `${audioFilesDir}/2_5449763210234170163.mp3`,
  bufferSize: 512,
  featureExtractors: [
    'rms',
    'zcr',
    'energy',
    'amplitudeSpectrum',
    'powerSpectrum',
    'spectralCentroid',
    'spectralFlatness',
    'spectralFlux',
    'spectralSlope',
    'spectralRolloff',
    'spectralSpread',
    'spectralSkewness',
    'spectralKurtosis',
    'chroma',
    'loudness',
    'perceptualSpread',
    'perceptualSharpness',
    'mfcc',
    'complexSpectrum',
    'buffer',
  ],
  inputs: 2,
  numberOfMFCCCoefficients: 20,
  callback: features => {
    levelRangeElement.value = features.rms
  },
})

console.debug(signal)
console.debug(extracted)
// async function analyzer(file) {
//   console.debug(file)
//   const toneAnalyzer = new Tone.Analyser()
//   console.debug(toneAnalyzer)
//   // const data = await fsPromises.readFile(file, { encoding: })
// }

// analyzer()
