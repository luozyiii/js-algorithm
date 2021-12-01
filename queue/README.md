# 队列

### 队列是什么?
- 一个 `先进先出` 的数据结构
- JavaScript 中没有队列，但可以用 Array 实现队列的所有功能。

### 队列的场景
- 需要 `先进先出` 的场景
- 比如：食堂排队打饭、JS异步中的任务队列、计算最近请求次数

#### 食堂排队打饭
- 食堂只留一个窗口，学生排队打饭似春运
- 先进先出，保证有序

#### JS 异步中的任务队列
- JS 是单线程，无法同时处理异步中的并发任务
- 使用任务队列先后处理异步任务

#### 计算最近请求次数
```
输入：
[[], [1], [100], [3001], [3002]]
输出：
[null, 1, 2, 3, 3]
```
- 有新请求就入队，3000ms前发出的请求出队
- 队列的长度就是最近请求次数

### LeetCode：933 最近的请求次数
[link](https://leetcode-cn.com/problems/number-of-recent-calls/)

#### 解题思路
- 越早发出的请求越早不在最近3000ms内的请求里
- 满足先进先出，考虑用队列

#### 解题步骤
- 有新请求就入队，3000ms前发出的请求出队
- 队列的长度就是最近请求次数

```javascript
var RecentCounter = function() {
    this.q = []
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
    this.q.push(t)
    while(this.q[0] < t - 3000) {
        this.q.shift()
    }
    return this.q.length
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

### 前端与队列：JS异步中的任务队列
```javascript
// 异步面试题
setTimeout(()=> console.log(1),0)
console.log(2)
// 2 1
```

#### 事件循环与任务队列
![queue](./assets/queue.png)
- Event Loop：事件循环
- Callback Queue：任务队列
- JS： JS引擎，用于执行代码
- WebAPIs：执行异步代码，回调函数放到 Callback Queue

### 总结
- 队列是一个 `先进先出` 的数据结构
- JavaScript 中没有队列，但可以用 Array 实现队列的所有功能。
- 队列的常用操作：push shift queue[0]