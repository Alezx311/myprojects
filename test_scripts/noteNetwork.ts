const brain = require('brain.js')
// const { FileSystem, Values, BashShell, Chroma } = require('./useful')
import { FileSystem, Values, BashShell, Chroma } from './useful'
// const { NOTES, SCALES } = require('./constants')

// const networkOptions = {
// 	inputSize: 2,
// 	hiddenLayers: [10],
// 	outputSize: 2,
// }
// const trainingOptions = { log: true, errorThresh: 0.09 }

// //* Network instance
// export const net = new brain.recurrent.LSTMTimeStep(networkOptions)

// //* Training network
// export const train = data => net.train(data, trainingOptions)

// //* First run after training
// export const run = data => net.run(data)

// //* Get Results
// export const results = data => net.forecast(data)

async function init() {
	const notesSeq = await FileSystem.read('./values/txt/music.txt')
	const notes = notesSeq.split('\n')
	console.debug(`notes size: ${notes}`)

	// const { chroma } = await FileSystem.readJson('./values/harmonics_65.json')
	// console.debug(`chroma size: ${chroma?.length}`)
	// console.debug(`chroma size: ${chroma?.length}`)
	// return { notes, chroma }

	Values.showStat(notes)
	// Values.showStat(notes)
	// Values.showStat(chroma)
}

init()
