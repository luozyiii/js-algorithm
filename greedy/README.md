# 贪心算法

### 贪心算法是什么
- 贪心算法是`算法设计`中的一种方法
- 期盼通过每个阶段的`局部最优`选择，从而达到全局的最优
- 结果`并不一定是最优`

### 贪心算法的解题步骤
- 将问题分解为若干个子问题
- 找出适合的贪心策略
- 求解每一个子问题的最优解
- 将局部最优堆叠成全局最优解

##### 贪心没有套路，说白了就是常识性推导加上举反例

#### 零钱兑换
```
输入：coins = [1, 2, 5], amount = 11
输出：3
解释：11 = 5 + 5 + 1

输入：coins = [1, 3, 4], amount = 6
输出：3
解释：11 = 4 + 1 + 1
```

### LeetCode：455 分饼干
[link](https://leetcode-cn.com/problems/assign-cookies/)

```
输入: g = [1,2], s = [1,2,3]
输出: 2
解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```

#### 解题思路
- 局部最优：既能满足孩子，还消耗最少
- 先将“较小的饼干”分给“胃口最小”的孩子

#### 解题步骤
- 对饼干数组和胃口数组升序排序
- 遍历饼干数组，找到能满足第一个孩子的饼干
- 然后继续遍历饼干数组，找到满足第二、三、...、n个孩子的饼干

```javascript
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    const sortFunction = function(a, b) {
        return a - b
    }; // 升序排序
    g.sort(sortFunction);
    s.sort(sortFunction);
    let i = 0;
    s.forEach(n => {
        if(n >= g[i]) {
            i++
        }
    })
    return i
};
// 时间复杂度：O(n * log n)
// 空间复杂度：O(1)
```

### LeetCode：122 买卖股票的最佳时机 II
[link](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

```
输入: prices = [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

#### 解题思路
- 前提：上帝视角，知道未来的价格
- 局部最优：见好就收，见差就不动，不做任何长远打算

#### 解题步骤
- 新建一个变量，用来统计总利润
- 遍历价格数组，如果当前价格比昨天高，就在昨天买，今天卖，否则不交易
- 遍历结束后，返回所有利润之和

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let profit = 0;
    for(let i = 1; i < prices.length; i++) {
        if(prices[i] > prices[i-1]) {
            profit += prices[i] - prices[i-1]
        }
    }
    return profit;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
```