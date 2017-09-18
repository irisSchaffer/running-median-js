const readline = require('readline');
const runningMedian = require('./runningMedian');

console.log('To add a number to the running median calculator, enter an integer and press Enter.');
console.log('You can exit with Ctrl + c');

const rl = readline.createInterface({
	input  : process.stdin,
	output : process.stdout
});

const calculator = runningMedian();

rl.on('line', input => {
	const val = parseInt(input, 10);
	if (isNaN(val)) {
		console.log('Not a number – Try again!');
		return;
	}

	console.log(`Adding ${val} to compute running median`);
	calculator.addValue(val);
	const median = calculator.getMedian();
	console.log(`New median is: ${median.toFixed(1)}`);
});

rl.on('SIGINT', _ => {
	rl.close();
});
