const Heap = require('./Heap')

const runningMedian = _ => {
	const minHeap = new Heap((a, b) => a - b)
    const maxHeap = new Heap((a, b) => b - a)

	const getMedian = _ => {
		if (minHeap.length() === maxHeap.length()) {
	        return (minHeap.root() + maxHeap.root()) / 2
	    } else {
	        return minHeap.length() > maxHeap.length() && minHeap.root() || maxHeap.root()
	    }
	}

	const addValue = val => {
		if (minHeap.length() === maxHeap.length()) {
            if (val < maxHeap.root()) {
                maxHeap.insert(val)
            } else {
                minHeap.insert(val)
            }
        } else if (maxHeap.length() > minHeap.length()) {
            if (val < maxHeap.root()) {
                const oldRoot = maxHeap.remove()
                minHeap.insert(oldRoot)
                maxHeap.insert(val)
            } else {
                minHeap.insert(val)
            }
        } else {
            if (val > minHeap.root()) {
                const oldRoot = minHeap.remove()
                maxHeap.insert(oldRoot)
                minHeap.insert(val)
            } else {
                maxHeap.insert(val)
            }
        }
	}

	return {
		addValue,
		getMedian
	}
}

module.exports = runningMedian
