// Require packages...

fs.readFile(__dirname + '/test.csv', function (err, testContent) {
	if (err) {
		console.log('Error:', err);
	}

	// Load training data...

	// Train network...

	// Test it out
	var testData = getMnistData(testContent);

	var numRight = 0;

	console.log('Neural Network tests:');
	for (i = 0; i < testData.length; i++) {
		var resultArr = net.run(testData[i].input);
		var result = resultArr.indexOf(Math.max.apply(Math, resultArr));
		var actual = testData[i].output.indexOf(Math.max.apply(Math, testData[i].output));

		var str = '(' + i + ') GOT: ' + result + ', ACTUAL: ' + actual;
		str += result === actual ? '' : ' -- WRONG!';

		numRight += result === actual ? 1 : 0;

		console.log(str);
	}

	console.log('Got', numRight, 'out of 350, or ' + String(100*(numRight/350)) + '%');
});