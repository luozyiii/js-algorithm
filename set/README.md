# 集合

### 集合是什么?
- 一种`无序且唯一`的数据结构
- ES6 中有集合，名为 Set
- 集合的常用的操作：去重、判断某元素是否在集合中、求交集...

### LeetCode：349 两个数组的交集
[link](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

#### 解题思路
- 求交集且无序唯一

#### 解题步骤
- 用集合对 nums1 去重
- 遍历 nums1，筛选出 nums2 也包含的值

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    return [...new Set(nums1)].filter(n => nums2.includes(n))
};
// 时间复杂度：O(n * m)
// 空间复杂度：O(n)
```

### 前端与集合：使用 ES6 中 Set

#### Set 操作
- 使用 Set 对象：new、add、delete、has、size
- 迭代Set：多种迭代方法、Set与Array互转、求交集/差集
```
set/set.js
```
