const brain = require('brain.js')

const networkOptions = {
	inputSize: 2,
	hiddenLayers: [10],
	outputSize: 2,
}
const trainingOptions = { log: true, errorThresh: 0.09 }

//* Network instance
export const net = new brain.recurrent.LSTMTimeStep(networkOptions)

//* Training network
export const train = data => net.train(data, trainingOptions)

//* First run after training
export const run = data => net.run(data)

//* Get Results
export const results = data => net.forecast(data)
