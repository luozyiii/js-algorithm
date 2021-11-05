class MinHeep {
    constructor() {
        this.heap= []
    }
    // 交换节点
    swap(i1, i2) {
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }
    // 获取父节点
    getParentIndex(i) {
        return (i - 1) >> 1; // 等价于下面
        // return Math((i - 1) / 2) 
    }
    // 获取左侧子节点
    getLeftIndex(i) {
        return i * 2 + 1;
    }
    // 获取右侧节点
    getRightIndex(i) {
        return i * 2 + 2;
    }
    // 上移
    shiftUp(index) {
        if(index === 0) return;
        const parentIndex = this.getParentIndex(index);
        if(this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);
        }
    }
    // 下移
    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if(this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex)
        }
        if(this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index);
            this.shiftDown(rightIndex)
        }
    }
    // 插入
    insert(value) {
        this.heap.push(value);
        this.shiftUp(this.heap.length - 1);
    }
    // 删除
    pop() {
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
    }
    // 获取堆顶
    peek() {
        return this.heap[0];
    }
    // 堆的大小
    size() {
        return  this.heap.length;
    }
}

const h = new MinHeep();
h.insert(3);
h.insert(2);
h.insert(1);
h.pop();

console.log('-----')