# 分而治之

### 分而治之是什么
- 分而治之是`算法设计`中的一种方法(思想)
- 它将一个问题`分`成多个和原问题相似的小问题，`递归解决`小问题，再将结果`合`并以解决原来的问题

### 场景一：归并排序
- 分：把数组从中间一分为二
- 解：递归地对两个子数组进行归并排序
- 合：合并有序子数组

### 场景二：快速排序
- 分：选基准，按基准把数组分成两个子数组
- 解：递归地对两个子数组进行快速排序
- 合：对两个子数组进行合并

### LeetCode：374 猜数字大小
[link](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)

#### 解题思路
- 二分搜索，同样具备“`分、解、合`”的特性
- 考虑使用分而治之

#### 解题步骤
- 分：计算中间元素，分割数组
- 解：递归地在较大或者较小子数组进行二分搜索
- 合：不需要此步，因为在子数组中搜到就返回了

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
    const rec = (low,high) => {
        if(low > high) return;
        const mid = Math.floor((low + high) / 2);
        const res = guess(mid);
        if(res === 0) {
            return mid;
        }else if(res === 1) {
            return rec(mid + 1, high)
        }else {
            return rec(1,mid - 1)
        }
    }
    return rec(1, n);
};
// 时间复杂度：O(log n)
// 空间复杂度：O(log n)
```

### LeetCode：226 翻转二叉树
[link](https://leetcode-cn.com/problems/invert-binary-tree/)

#### 解题思路
- 先翻转左右子树，再将子树换个位置
- 符合 “`分、解、合`” 特性
- 考虑使用分而治之

#### 解题步骤
- 分：获取左右子树
- 解：递归地翻转左右子树
- 合：将翻转后的左右子树换个位置放到根节点上

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(!root) {return null}
    return {
        val: root.val,
        left: invertTree(root.right),
        right: invertTree(root.left)
    }
};
// 时间复杂度：O(n)
// 空间复杂度：O(h) h:树的高度
```

### LeetCode：100 相同的树
[link](https://leetcode-cn.com/problems/same-tree/)

#### 解题思路
- 两个树：根节点的值相同，坐子树相同，右子树相同
- 符合 “`分、解、合`” 特性
- 考虑使用分而治之

#### 解题步骤
- 分：获取两个树的左子树和右子树
- 解：递归地判断两个树的左子树是否相同，右子树是否相同
- 合：将上述结果合并，如果根节点的值也相同，树就相同

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if(!p && !q) return true;
    if(p && q && p.val === q.val && isSameTree(p.left,q.left) && isSameTree(p.right, q.right)) {
        return true;
    }
    return false;
};
// 时间复杂度：O(n)
// 空间复杂度：O(h) h:树的高度
```

### LeetCode：101 对称二叉树
[link](https://leetcode-cn.com/problems/symmetric-tree/)

#### 解题思路
- 转化为：左右子树是否镜像
- 分解为：树1的左子树和树2的右子树是否镜像，树1的右子树和树2的左子树是否镜像
- 符合 “`分、解、合`” 特性
- 考虑使用分而治之

#### 解题步骤
- 分：获取两个树的左子树和右子树
- 解：递归地判断树1的左子树和树2的右子树是否镜像，树1的右子树和树2的左子树是否镜像
- 合：如果上述都成立，且根节点值也相同，两个树就镜像

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root) return true;
    const isMirror = (l,r) => {
        if(!l && !r) return true;
        if(l && r && l.val === r.val &&
        isMirror(l.left, r.right) && 
        isMirror(l.right, r.left)) {
            return true
        }
        return false
    }
    return isMirror(root.left,root.right)
};
// 时间复杂度：O(n)
// 空间复杂度：O(h) h:树的高度
```