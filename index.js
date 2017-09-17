const readline = require('readline');
const runningMedian = require('./runningMedian')

console.log('Enter a number and press Enter to add a number to the running median calculator.')
console.log('You can exit with Ctrl + c')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const calculator = runningMedian();

rl.on('line', input => {
	const val = parseInt(input, 10);
	if (isNaN(val)) {
		console.log('Not a number!');
		return;
	}

	console.log(`Adding ${val} to compute running median`);
	calculator.addValue(val);
	const median = calculator.getMedian();
    console.log(median.toFixed(1));
});

rl.on('SIGINT', _ => {
	rl.close();
});
