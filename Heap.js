class Heap {
    constructor(sorter) {
        this.elements = []
        this.sorter = sorter
    }

    root() { return this.elements[0] }
    empty() { return this.elements.length === 0 }
    length() { return this.elements.length }

    parentIndex(i) { return Math.floor((i - 1) / 2) }
    rightIndex(i) { return 2 * i + 2 }
    leftIndex(i) { return 2 * i + 1 }

    hasIndex(i) { return i >= 0 && i < this.length() }
    hasParent(i) { return this.hasIndex(this.parentIndex(i)) }
    hasRight(i) { return this.hasIndex(this.rightIndex(i)) }
    hasLeft(i) { return this.hasIndex(this.leftIndex(i)) }

    parent(i) { return this.elements[this.parentIndex(i)] }
    left(i) { return this.elements[this.leftIndex(i)] }
    right(i) { return this.elements[this.rightIndex(i)] }

    remove() {
        const root = this.elements[0]
        if (this.length() === 1) {
            this.elements = []
            return root
        }
        this.elements[0] = this.elements.pop()
        this.heapifyDown(0)
        return root
    }

    insert(data) {
        this.elements.push(data)
        this.heapifyUp(this.length() - 1)
    }

    swap(i, j) {
        const temp = this.elements[i]
        this.elements[i] = this.elements[j]
        this.elements[j] = temp
    }

    higher(a, b) {
        return this.sorter(a, b) < 0
    }

    heapifyUp(start) {
        let i = start
        while (this.hasParent(i) && this.higher(this.elements[i], this.parent(i))) {
            this.swap(i, this.parentIndex(i))
            i = this.parentIndex(i)
        }
    }

    heapifyDown(start) {
        let i = start
        while (this.hasLeft(i)) {
            if (
                this.higher(this.left(i), this.elements[i])
                || (this.hasRight(i) && this.higher(this.right(i), this.elements[i]))
            ) {
                if (!this.hasRight(i) || this.higher(this.left(i), this.right(i))) {
                    this.swap(i, this.leftIndex(i))
                    i = this.leftIndex(i)
                } else {
                    this.swap(i, this.rightIndex(i))
                    i = this.rightIndex(i)
                }
            } else {
                break
            }
        }
    }
}

module.exports = Heap
