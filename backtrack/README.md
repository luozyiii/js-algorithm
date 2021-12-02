# 回溯算法

### 回溯算法是什么
- 回溯算法是`算法设计`中的一种方法
- 回溯算法是一种`渐进式`寻找并构建问题解决方式的策略
- 回溯算法会先从一个可能的动作开始解决问题，如果不行，就回溯并选择另一个动作，直到将问题解决

#### 什么问题适合用回溯算法解决
- 有很多路
- 这些路里，有`死路`，也有`出路`
- 通常需要递归来模拟所有的路

### LeetCode：46 全排列
[link](https://leetcode-cn.com/problems/permutations/)

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

#### 解题思路
- 要求：1、所有排列情况；2、没有重复元素
- 有出路、有死路
- 考虑使用回溯算法

#### 解题步骤
- 用递归模拟出所有情况
- 遇到包含重复元素的情况，就回溯
- 收集所有到达递归终点的情况，并返回

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = [];
    const backtrack = (path) => {
        if(path.length === nums.length) {
            res.push(path);
        }
        nums.forEach(n => {
            if(path.includes(n)) {return;}
            backtrack(path.concat(n));
        })
    }
    backtrack([])
    return res;
};
// 时间复杂度：O(n!), n! = 1*2*3*...*(n-1)*n
// 空间复杂度：O(n)
```

### LeetCode：78 子集
[link](https://leetcode-cn.com/problems/subsets/)

```
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

#### 解题思路
- 要求：1、所有子集；2、没有重复元素
- 有出路、有死路
- 考虑使用回溯算法

#### 解题步骤
- 用递归模拟出所有情况
- 保证接的数字都是后面的数字
- 收集所有到达递归终点的情况，并返回

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const res = [];
    const backtrack = (path, l, start) => {
        if(path.length === l) {
            res.push(path);
            return;
        }
        for(let i = start; i < nums.length; i++) {
            backtrack(path.concat(nums[i]), l, i+1);
        }
    }
    for(let i = 0; i <= nums.length; i++) {
        backtrack([], i, 0);
    }
    return res;
};
// 时间复杂度：O(2^n)，因为每个元素都有两种可能（存在或者不存在）
// 空间复杂度：O(n)
```