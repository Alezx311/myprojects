// const brain = require("brain.js");

// const net = new brain.NeuralNetwork();

// net.train([
//   { input: [0, 0], output: [0] },
//   { input: [0, 1], output: [1] },
//   { input: [1, 0], output: [1] },
//   { input: [1, 1], output: [0] },
// ]);

// const output = net.run([1, 0]);

// console.log(output);

const brain = require('brain.js')
const fs = require('fs').promises

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 2,
  hiddenLayers: [10],
  outputSize: 2
})

const riff = [
  [3,2],
  [4,2],
  [4,3],
  [4,2],
  [6,0],
  [6,3],
  [5,0],
  [5,5],
  [6,0],
  [6,0],
  [4,7],
  [3,7],
  [5,8],
  [5,7],
  [5,5],
]
const trainingData = [
  riff
]

net.train(trainingData, { log: false, errorThreshold: 0.09 })

// ######################

const closeToFiveAndOne = net.run(riff);

console.log(closeToFiveAndOne);

// now we're cookin' with gas!
const forecast = net.forecast(
  riff,
  1000
);

async function write(data) {
  await fs.writeFile('results.txt', data, { encoding: 'utf8'})
}

// console.debug('next 1000 predictions', forecast);
write(JSON.stringify(forecast, null, '\t'))
console.info('ready');