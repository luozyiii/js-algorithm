# 动态规划

### 动态规划是什么
- 动态规划是`算法设计`中的一种方法
- 它将一个问题分解为`相互重叠`的子问题，通过反复求解子问题，来解决原来的问题

#### 斐波那契数列
```
0 1 1 2 3 5 8 13 21 34
```
- 定义子问题: F(n) = F(n-1) + F(n-2)
- 反复执行：从2循环到n，执行上述公式

### LeetCode：70 爬楼梯
[link](https://leetcode-cn.com/problems/climbing-stairs/)

#### 解题思路
- 爬到第n阶可以在第 n-1 阶爬1个台阶，或者在第 n-2 阶爬了2个台阶
- F(n) = F(n-1) + F(n-2)
- 使用动态规划

#### 解题步骤
- 定义子问题: F(n) = F(n-1) + F(n-2)
- 反复执行：从2循环到n，执行上述公式

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n < 2) return 1;
    const dp = [1, 1];
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    console.log(dp)
    return dp[n];
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

var climbStairs = function(n) {
    if(n < 2) return 1;
    let dp0 = 1;
    let dp1 = 1;
    for(let i = 2; i <= n; i++) {
        let temp = dp0;
        dp0 = dp1;
        dp1 = dp1 + temp;
    }
    return dp1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
```

### LeetCode：198 打家劫舍
[link](https://leetcode-cn.com/problems/house-robber/)

#### 解题思路
- f(k) = 从前k个房屋中能偷窃到的最大数额
- Ak = 第k个房屋的钱数
- f(k) = max(f(k-2) + Ak, f(k-1))

#### 解题步骤
- 定义子问题: f(k) = max(f(k-2) + Ak, f(k-1))
- 反复执行：从2循环到n，执行上述公式

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    if(nums.length === 0) return 0
    const dp = [0, nums[0]];
    for(let i = 2; i<= nums.length; i++) {
        dp[i] = Math.max(dp[i-2] + nums[i-1], dp[i-1])
    }
    console.log(dp);
    return dp[nums.length]
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    if(nums.length === 0) return 0
    let dp0 = 0;
    let dp1 = nums[0];
    for(let i = 2; i<= nums.length; i++) {
        const temp = Math.max(dp0 + nums[i-1], dp1);
        dp0 = dp1;
        dp1 = temp;
    }
    return dp1
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
```