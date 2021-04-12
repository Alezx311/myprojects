const brain = require('brain.js')

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 2,
  hiddenLayers: [10],
  outputSize: 2
})

const trainingData = [
  [
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
]

net.train(trainingData, { log: true, errorThreshold: 0.09 })

// ######################

const closeToFiveAndOne = net.run([
  [1, 5],
  [2, 4],
  [3, 3],
  [4, 2],
]);

console.log(closeToFiveAndOne);

// now we're cookin' with gas!
const forecast = net.forecast(
  [
    [1, 5],
    [2, 4],
  ],
  3
);

console.log('next 3 predictions', forecast);