const heap = sorter => {
	let elements = [];

	const root = _ => elements[0];
	const empty = _ => elements.length === 0;
	const length = _ => elements.length;

	const parentIndex = i => Math.floor((i - 1) / 2);
	const rightIndex = i => 2 * i + 2;
	const leftIndex = i => 2 * i + 1;

	const hasIndex = i => i >= 0 && i < length();
	const hasParent = i => hasIndex(parentIndex(i));
	const hasRight = i => hasIndex(rightIndex(i));
	const hasLeft = i => hasIndex(leftIndex(i));

	const parent = i => elements[parentIndex(i)];
	const left = i => elements[leftIndex(i)];
	const right = i => elements[rightIndex(i)];

	const higher = (a, b) => sorter(a, b) < 0;

	const swap = (i, j) => {
		const temp = elements[i];
		elements[i] = elements[j];
		elements[j] = temp;
	};

	const heapifyUp = start => {
		let i = start;
		while (hasParent(i) && higher(elements[i], parent(i))) {
			swap(i, parentIndex(i));
			i = parentIndex(i);
		}
	};

	const heapifyDown = start => {
		let i = start;
		while (hasLeft(i)) {
			if (
				higher(left(i), elements[i])
				|| (hasRight(i) && higher(right(i), elements[i]))
			) {
				if (!hasRight(i) || higher(left(i), right(i))) {
					swap(i, leftIndex(i));
					i = leftIndex(i);
				} else {
					swap(i, rightIndex(i));
					i = rightIndex(i);
				}
			} else {
				break;
			}
		}
	};

	const remove = _ => {
		const root = elements[0];

		if (length() === 1) {
			elements = [];
		} else {
			elements[0] = elements.pop();
			heapifyDown(0);
		}

		return root;
	};

	const insert = data => {
		elements.push(data);
		heapifyUp(length() - 1);
	};

	const getElements = _ => elements;

	return {
		remove,
		insert,
		length,
		empty,
		root,
		getElements
	};
}

module.exports = heap;
