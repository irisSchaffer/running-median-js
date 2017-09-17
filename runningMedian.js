const heap = require('./heap');

const runningMedian = _ => {
	const minHeap = heap((a, b) => a - b);
    const maxHeap = heap((a, b) => b - a);

	const getMedian = _ => {
		if (minHeap.length() === maxHeap.length()) {
	        return (minHeap.root() + maxHeap.root()) / 2;
	    } else {
	        return minHeap.length() > maxHeap.length()
                ? minHeap.root()
                : maxHeap.root();
	    }
	};

    const shouldAddToMaxHeap = val => val < maxHeap.root();
    const shouldAddToMinHeap = val => val > minHeap.root();

	const addValue = val => {
		if (minHeap.length() === maxHeap.length()) {
            if (shouldAddToMaxHeap(val)) {
                maxHeap.insert(val);
            } else {
                minHeap.insert(val);
            }
        } else if (maxHeap.length() > minHeap.length()) {
            if (shouldAddToMinHeap()) {
                const oldRoot = maxHeap.remove();
                minHeap.insert(oldRoot);
                maxHeap.insert(val);
            } else {
                minHeap.insert(val);
            }
        } else {
            if (shouldAddToMinHeap(val)) {
                const oldRoot = minHeap.remove();
                maxHeap.insert(oldRoot);
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
