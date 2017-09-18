const heap = require('./heap');

const runningMedian = _ => {
	const minHeap = heap((a, b) => a - b);
	const maxHeap = heap((a, b) => b - a);

	const getMedian = _ => {
		if (minHeap.length() === maxHeap.length()) {
			return (minHeap.root() + maxHeap.root()) / 2;
		}
		return minHeap.length() > maxHeap.length()
			? minHeap.root()
			: maxHeap.root();
	};

	const hasToAddToMaxHeap = val => val < maxHeap.root();
	const hasToAddToMinHeap = val => val > minHeap.root();

	const addValue = val => {
		if (hasToAddToMinHeap(val)) {
			if (minHeap.length() > maxHeap.length()) {
				const oldRoot = minHeap.remove();
				maxHeap.insert(oldRoot);
			}
			minHeap.insert(val);
		} else if (hasToAddToMaxHeap(val)) {
			if (maxHeap.length() > minHeap.length()) {
				const oldRoot = maxHeap.remove();
				minHeap.insert(oldRoot);
			}
			maxHeap.insert(val);
		} else { // can add to either
			if (minHeap.length() <= maxHeap.length()) {
				minHeap.insert(val);
			} else {
				maxHeap.insert(val);
			}
		}
	};

	return {
		addValue,
		getMedian
	};
};

module.exports = runningMedian;
