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
	const guitarOptions = {
		strings: 6,
		frets: 24,
		tuning: 'E Standart',
	}
	const resultOptions = {
		notesLength: 1000,
		notesRange: [
			// notes represented as string/fret indexes
			[6, 0],
			[6, 3],
			[6, 5],
			[6, 7],
			[6, 8],
			[6, 10],
			[6, 12],
			[5, 0],
			[5, 3],
			[5, 5],
			[5, 7],
			[5, 8],
			[5, 10],
			[5, 12],
		],
	}
}

init()
