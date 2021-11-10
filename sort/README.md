# 排序和搜索

### 排序和搜索是什么?
- 排序：把某个乱序的的数组变成升序或者降序的数组
- 搜索：找出数组中某个元素的下标

#### JS 中的排序和搜索
- JS中的排序：数组的sort方法
- JS中的搜索：数组的indexOf方法

#### 排序算法
- 冒泡排序
- 选择排序
- 插入排序
- 归并排序
- 快速排序等

#### 搜索算法
- 顺序搜索
- 二分搜索

### JavaScript实现：冒泡排序

#### 冒泡排序的思路
- 比较所有的相邻元素，如果第一个比第二个大，则交换它们
- 一轮下来，可以保证最后一个数是最大的
- 执行 n - 1 轮，就可以完成排序

#### 冒泡排序的动画
[link](https://visualgo.net/zh/sorting)

```
sort/bubbleSort.js
```

### JavaScript实现：选择排序

#### 选择排序的思路
- 找到数组中的最小值，选中它并将其放置第一位
- 接着找到第二小的值，选中它并将其放置第二位
- 以此类推，执行 n - 1 轮

#### 选择排序的动画
[link](https://visualgo.net/zh/sorting)

```
sort/selectionSort.js
```

### JavaScript实现：插入排序

#### 插入排序的思路
- 从第二个数开始`往前比`
- 比它大就`往后排`
- 以此类推进行到最后一个数


#### 插入排序的动画
[link](https://visualgo.net/zh/sorting)

```
sort/insertionSort.js
```

### JavaScript实现：归并排序

#### 归并排序的思路
- 分：把数组劈成两半，再递归地对子数组进行“分”操作，直到分成一个个单独的数
- 合：把两个数合并为有序数组，再对有序数组进行合并，直到全部子数组合并为一个完整数组

#### 合并两个有序数组
- 新建一个空数组 res，用于存放最终排序后的数组
- 比较两个有序数组的头部，较小者出队并推入res中
- 如果两个数组还有值，就重复第二步

#### 归并排序的动画
[link](https://visualgo.net/zh/sorting)

```
sort/mergeSort.js
```

### JavaScript实现：快速排序

#### 快速排序的思路
- 分区：从数组中任意选择一个 “基准”，所有比基准小的元素放在基准前面，比基准大的元素放在基准的后面
- 递归：递归地对基准前后的子数组进行分区

#### 快速排序的动画
[link](https://visualgo.net/zh/sorting)

```
sort/quickSort.js
```

### JavaScript实现：顺序搜索

#### 顺序搜索的思路
- 遍历数组
- 找到跟目标值相等的元素，就返回它的下标
- 遍历结束后，如果没有搜索到目标值，就返回 -1

```
search/sequentialSearch.js
```

### JavaScript实现：二分搜索

#### 二分搜索的思路
- 从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束
- 如果目标值大于或者小于中间元素，则在大于或小于中间元素的那一半数组中搜索

```
search/binarySearch.js
```

### LeetCode：21 合并两个有序链表
[link](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

#### 解题思路
- 与归并排序中的合并两个有序数组很相似
- 将数组替换成链表就能解次题

#### 解题步骤
- 新建一个新链表，作为返回结果
- 用指针遍历两个有序链表，并比较两个链表的当前节点，较小者先接入新链表，并将指针后移一步
- 链表遍历结束，返回新链表

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    const res = new ListNode(0);
    let p = res;
    let p1 = l1;
    let p2 = l2;
    while(p1 && p2) {
        if(p1.val < p2.val) {
            p.next = p1;
            p1 = p1.next;
        }else {
            p.next = p2;
            p2 = p2.next
        }
        p = p.next
    }
    if(p1){
        p.next = p1;
    }
    if(p2){
        p.next = p2;
    }
    return res.next
};
// 时间复杂度：O(m + n)
// 空间复杂度：O(1)
```

### LeetCode：374 猜数字大小

#### 解题思路
- 这就是一个二分搜索
- 调用guess函数，来判断中间元素是否是中间值

#### 解题步骤
- 从数组的中间元素开始，如果中间元素正好是目标值，则搜索过程结束。
- 如果目标值大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找

```javascript
/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
    let low = 1;
    let high = n;
    while(low <= high) {
        const mid = Math.floor((low + high) / 2);
        const res = guess(mid);
        if(res === 0) {
            return mid;
        }else if(res === 1) {
            low = mid + 1;
        }else {
            high = mid - 1;
        }
    }
};
// 时间复杂度：O(log n)
// 空间复杂度：O(1)
```
