# 链表

### 链表是什么?
- 多个元素组成的列表
- 元素存储不连续，用`next指针`连在一起

### 数组 VS 链表
- 数组：增删非首尾元素时往往需要移动元素
- 链表：增删非首尾元素，不需要移动元素，只需要更改 next 的指向即可

### JS 中的链表
`linkedList/index.js`
- JavaScript 中没有链表
- 可以用 Object 模拟链表

### LeetCode：237 删除链表中的节点

#### 解题思路
- 无法直接获取被删除节点的上个节点
- 将被删除节点转移到下个节点

#### 解题步骤
- 将被删除节点的值改成下个节点
- 删除下个节点

```javascript
var deleteNode = function(node) {
    node.val = node.next.val
    node.next = node.next.next
};
// 时间复杂度 O(1)
// 空间复杂度 O(1)
```

### LeetCode：206 反转链表
[link](https://leetcode-cn.com/problems/reverse-linked-list/)

#### 解题思路
- 反转两个节点：将 n + 1 的next指向 n
- 反转多个节点：双指针遍历链表，重复上述操作

#### 解题步骤
- 双指针一前一后遍历链表
- 反转双指针

```javascript
var reverseList = function(head) {
    let p1 = head;
    let p2 = null;
    while(p1) {
        // console.log(p1.val, p2 && p2.val)
        const temp = p1.next
        p1.next = p2
        p2 = p1
        p1 = temp
    }
    console.log(p1,p2)
    return p2
};
// 时间复杂度 O(n)
// 空间复杂度 O(1)
```

### LeetCode：2 两数相加
[link](https://leetcode-cn.com/problems/add-two-numbers/)
```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```
#### 解题思路
- 小学数学题，模拟相加操作
- 需要遍历链表

#### 解题步骤
- 新建一个空链表
- 遍历被相加的两个链表，模拟相加操作，将`个位数`追加到新链表上，将十位数留到下一位去相加

```javascript
var addTwoNumbers = function(l1, l2) {
    const l3 = new ListNode(0);
    let p1 = l1;
    let p2 = l2;
    let p3 = l3;
    let carry = 0
    while(p1 || p2) {
        const v1 = p1 ? p1.val : 0;
        const v2 = p2 ? p2.val : 0;
        const val = v1 + v2 + carry;
        carry = Math.floor(val / 10);
        p3.next = new ListNode(val % 10);
        if(p1) p1 = p1.next
        if(p2) p2 = p2.next
        p3 = p3.next
    }
    if(carry) {
        p3.next = new ListNode(carry)
    }
    return l3.next
};
// 时间复杂度: O(n)
// 空间复杂度：O(n)
```

### LeetCode：83 删除排序链表中的重复元素
[link](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

#### 解题思路
- 因为链表是有序的，所以重复元素一定相邻
- 遍历链表，如果发现当前元素和下个元素值相同，就删除下个元素值

#### 解题步骤
- 遍历链表，如果发现当前元素和下个元素值相同，就删除下个元素值
- 遍历结束，返回原链表的头部

```javascript
var deleteDuplicates = function(head) {
    let p = head
    while(p && p.next) {
        if(p.val === p.next.val) {
            p.next = p.next.next
        }else {
            p = p.next
        }
    }
    return head
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
```

### LeetCode：141 环形链表

#### 解题思路
- 两个人在圆形操场上的起点同时起跑，速度快的人一定会超过速度慢的人一圈
- 用一快一慢两个指针遍历链表，如果指针能够相逢，那么链表就有圈

#### 解题步骤
- 用一快一慢两个指针遍历链表，如果指针能够相逢，就返回true
- 遍历结束后，还没有相逢就返回false

```javascript
var hasCycle = function(head) {
    let p1 = head
    let p2 = head
    while(p1 && p2 && p2.next) {
        p1 = p1.next
        p2 = p2.next.next
        if(p1 === p2) {
            return true
        }
    }
    return false
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
```

### 前端与链表：JS 中的原型链

#### 原型链介绍
- 原型链的本质是链表
- 原型链上的节点时各种原型对象，比如 Function.prototype、Object.prototype...
- 原型链通过 __proto__ 属性连接各种原型对象

#### 原型链长啥样?
`linkedList/proto.js`
- obj -> Object.prototype -> null
- func -> Function.prototype -> Object.prototype -> null
- arr -> Array.prototype -> Object.prototype -> null

#### 原型链知识点
- 如果 A 沿着原型链能找到 B.prototype，那么A instanceof B 为true
- 如果 A 对象上没有找到 x 属性，那么会沿着原型链找 x 属性

#### 面试题

##### 简述 instanceof 的原理，并用代码实现
- 知识点：如果 A 沿着原型链能找到 B.prototype，那么A instanceof B 为true
- 解法：遍历 A 的原型链，如果找到 B.prototype，返回 true， 否则返回 false
```javascript
const instanceOf = (A, B) => {
    let p = A;
    while(p) {
        if(p === B.prototype) {
            return true
        }
        p = p.__proto__;
    }
    return false
}
```

##### 题二
- 知识点：如果 A 对象上没有找到 x 属性，那么会沿着原型链找 x 属性
```javascript
var foo = {},
F = function() {}

Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a) // value a
console.log(foo.b) // undefined

console.log(F.a)  // undefined
console.log(F.b)  // value b
```

### 前端与链表：使用链表指针获取 JSON 的节点值
```
linkedList/json.js
```

### 总结
- 链表里的元素存储不是连续的，之间通过 `next` 连接
- JavaScript 中没有 链表，但可以用 Object 模拟链表
- 链表常用操作：修改next、遍历链表
- JS 中的原型链也是一个链表
- 使用链表指针可以获取JSON的节点值