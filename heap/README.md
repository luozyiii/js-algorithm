# 堆

### 堆是什么?
- 堆是一种特殊的`完全二叉树`
- 所有的节点都大于等于(最大堆)或小于等于(最小堆)它的子节点

#### JS 中的堆
![dui](./assets/dui.png)
- JS 中通常用数组表示堆
- 左侧子节点的位置是 2 * index + 1
- 右侧子节点的位置是 2 * index + 2
- 父节点位置是 (index - 1) / 2

#### 堆的应用
- 堆能`高效、快速`地找出`最大值和最小值`，时间复杂度：O(1)
- 找出`第K个`最大（小）元素

#### 第K个最大元素
- 构建一个最小堆，并将元素依次插入堆中
- 当堆的容量超过K，就删除堆顶
- 当插入结束后，堆顶就是第K个最大元素


### JavaScript 实现：最小堆类

#### 实现步骤
- 在类里，声明一个数组，用来装元素
- 主要方法：插入、删除堆顶、获取堆顶、获取堆大小

```
heep/MinHeap.js
```

##### 插入
- 将值插入堆的底部，即数组的尾部
- 然后上移：将这个值和它的父节点进行交换，直到父节点小于等于这个插入的值
- 大小为 K 的堆中插入元素的时间复杂度为O (log k)

##### 删除
- 用数组尾部元素替换堆顶（直接删除堆顶会破坏堆结构）
- 然后下移：将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶
- 大小为 K 的堆中删除堆顶的时间复杂度为O (log k)

##### 获取堆顶和堆的大小
- 获取堆顶：返回数组的头部
- 获取堆的大小：返回数组的长度

### LeetCode：215 数组中的第 K 个最大元素
[link](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

#### 解题思路
- 看到 “第K个最大元素”
- 考虑使用选择使用最小堆

#### 解题步骤
- 构建一个最小堆，并依次把数组的值插入堆中。
- 当堆的容量超过K，就删除堆顶
- 插入结束后，堆顶就是第K个最大元素

```javascript
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
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const h = new MinHeep();
    nums.forEach(n => {
        h.insert(n);
        if(h.size() > k) {
            h.pop();
        }
    })
    return h.peek();
};
// 时间复杂度：O(n * log k)
// 空间复杂度：O(k)
```

### LeetCode：347 前 K 个高频元素
[link](https://leetcode-cn.com/problems/top-k-frequent-elements/)

```javascript
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
        if(this.heap[parentIndex] && this.heap[parentIndex].value > this.heap[index].value) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);
        }
    }
    // 下移
    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if(this.heap[leftIndex] && this.heap[leftIndex].value < this.heap[index].value) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex)
        }
        if(this.heap[rightIndex] && this.heap[rightIndex].value < this.heap[index].value) {
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

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const map = new Map();
    nums.forEach(n => {
        map.set(n, map.has(n) ? map.get(n) + 1 : 1);
    });
    const h = new MinHeep();
    map.forEach((value, key) => {
        h.insert({value, key});
        if(h.size() > k) {
            h.pop();
        }
    });
    return h.heap.map(a => a.key);
};
// 时间复杂度：O(n * log k)
// 空间复杂度：O(n)
```

### LeetCode：23 合并K个排序链表
[link](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

#### 解题思路
- 新链表的下一个节点一定是 k 个链表头中最小节点
- 考虑选择使用最小堆

#### 解题步骤
- 构建一个最小堆，并依次把链表头插入堆中
- 弹出堆顶接到输出链表，并将堆顶所在链表的新链表头插入堆中
- 等堆元素全部弹出，合并工作就完成了

```javascript
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
        if(this.heap[parentIndex] && this.heap[parentIndex].val > this.heap[index].val) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);
        }
    }
    // 下移
    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if(this.heap[leftIndex] && this.heap[leftIndex].val < this.heap[index].val) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex)
        }
        if(this.heap[rightIndex] && this.heap[rightIndex].val < this.heap[index].val) {
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
        if(this.size() === 1) return this.heap.shift();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
        return top;
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
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    const res = new ListNode(0);
    let p = res;
    const h = new MinHeep();
    lists.forEach(l => {
        if(l) h.insert(l);
    })
    while(h.size()) {
        const n = h.pop();
        p.next = n;
        p = p.next;
        if(n.next) h.insert(n.next);
    }
    return res.next;
};
// 时间复杂度：O(n * log k)
// 空间复杂度：O(k)
```


