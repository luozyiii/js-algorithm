# 树

### 树是什么?
- 一种`分层`数据的抽象模型
- 前端工作中常见的树包括：DOM树、级联选择、树形控件...
- JS中没有树，但是可以用Object和Array构建树
- 树的常用操作：深度/广度优先遍历、先中后序遍历

### 深度与广度优先遍历

#### 什么是深度/广度优先遍历？
- 深度优先遍历：尽可能深的搜索树的分支
- 广度优先遍历：先访问离根节点最近的节点

#### 深度优先遍历算法口诀
- 访问根节点
- 对根节点的children挨个进行深度优先遍历
```
tree/dfs.js
```

#### 广度优先遍历算法口诀
- 新建一个队列，把根节点入队
- 把队头出队并访问
- 把队头的children挨个入队
- 重复第二、三步，直到队列为空
```
tree/bfs.js
```

### 二叉树的先中后序遍历(递归版)

#### 二叉树是什么？
- 树中每个节点`最多只能有两个`子节点
- 在JS中通常用Object来模拟二叉树
```javascript
const binaryTree = {
    val: 1,
    left: {
        val: 2,
        left: null,
        right: null,
    },
    right: {
        val: 3,
        left: null,
        right: null
    }
}
```

#### 先序遍历算法口诀
- 访问`根`节点
- 对根节点的`左子树`进行先序遍历
- 对根节点的`右子树`进行先序遍历
```
tree/preorder.js
```

#### 中序遍历算法口诀
- 对根节点的`左子树`进行中序遍历
- 访问`根`节点
- 对根节点的`右子树`进行中序遍历
```
tree/inorder.js
```

#### 后序遍历算法口诀
- 对根节点的`左子树`进行后序遍历
- 对根节点的`右子树`进行后序遍历
- 访问`根`节点
```
tree/postorder.js
```

### 二叉树的先中后序遍历(非递归版)`难点`

### LeetCode：104 二叉树的最大深度

#### 解题思路
- 求最大深度，考虑使用`深度优先遍历`
- 在深度优先遍历过程中，记录每个节点所在的层级，找出最大的层级即可

#### 解题步骤
- 新建一个变量，记录最大深度
- 深度优先遍历整棵树，并记录每个节点的层级，同时不断刷新最大深度这个变量
- 遍历结束返回`最大深度这个变量`

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
 * @return {number}
 */
var maxDepth = function(root) {
    let res = 0;
    const dfs = (n, l) => {
        if(!n) return
        // console.log(n.val, l)
        if(!n.left && !n.right) {
            res = Math.max(res,l)
        }
        dfs(n.left, l + 1)
        dfs(n.right, l + 1)
    }
    dfs(root, 1)
    return res
};
// 时间复杂度：O(n)
// 空间复杂度：O(log n) ~ O(n), 存在函数堆栈
```

### LeetCode：111 二叉树的最小深度

#### 解题思路
- 求最小深度，考虑使用广度优先遍历
- 在广度优先遍历过程中，遇到叶子节点，停止遍历，返回节点层级

#### 解题步骤
- `广度优先遍历`整棵树，并记录记录每个节点的层级
- 遇到叶子节点，返回节点层级，停止遍历

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
 * @return {number}
 */
var minDepth = function(root) {
    if(!root) {return 0}
    const q = [[root, 1]]
    while(q.length) {
        const [n, l] = q.shift()
        // console.log(n.val, l)
        if(!n.left && !n.right) {
            return l
        }
        if(n.left) {
            q.push([n.left, l + 1])
        }
        if(n.right) {
            q.push([n.right, l + 1])
        }
    }
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

### LeetCode：102 二叉树的层序遍历

#### 解题思路
- 层序遍历就是广度优先遍历
- 不过在遍历时候需要记录当前节点所处的层级，方便将其添加到不同的数组中

#### 解题步骤
- 广度优先遍历二叉树
- 遍历过程中，记录每个节点的层级，并将其添加到不同的数组中

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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let res = []
    if(!root) return res;
    const q = [[root, 0]];
    while(q.length) {
        const [n, level] = q.shift();
        // console.log(n.val, level)
        if(!res[level]) {
           res.push([n.val])
        }else {
            res[level].push(n.val)
        }
        if(n.left) q.push([n.left, level + 1]);
        if(n.right) q.push([n.right, level + 1]);
    }
    return res
};

var levelOrder = function(root) {
    let res = []
    if(!root) return res;
    const q = [root];
    while(q.length) {
        let len = q.length;
        res.push([])
        while(len--) {
            const n = q.shift();
            res[res.length - 1].push(n.val)
            if(n.left) q.push(n.left);
            if(n.right) q.push(n.right);
        }
    }
    return res
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

### LeetCode：94 二叉树的中序遍历
```javascript
// 递归
var inorderTraversal = function(root) {
    const res = [];
    const rec = (n) => {
        if(!n) return
        rec(n.left)
        res.push(n.val)
        rec(n.right)
    }
    rec(root)
    return res
};
// 迭代 利用栈实现
var inorderTraversal = function(root) {
    const res = [];
    const stack = [];
    let p = root;
    while(stack.length || p) {
        while(p) {
            stack.push(p);
            p = p.left;
        }
        const n = stack.pop();
        res.push(n.val);
        p = n.right;
    }
    return res
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

### LeetCode：112 路径总和

#### 解题思路
- 在深度优先遍历的过程中，记录当前路径的节点值的和
- 在叶子节点出，判断当前路径的节点值的和是否等于目标值

#### 解题步骤
- 深度优先遍历二叉树，在叶子节点处，判断当前路径的节点值和是否等于目标值，是就返回true
- 遍历结束，如果没有匹配，就返回false

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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    if(!root) return false;
    let res = false
    const dfs = (n, s) => {
        // console.log(n.val, s);
        if(!n.left && !n.right && s === targetSum) {
            res = true;
        }
        if(n.left) dfs(n.left, s + n.left.val);
        if(n.right) dfs(n.right, s + n.right.val);
    }
    dfs(root, root.val)
    return res
};
// 时间复杂度：O(n)
// 空间复杂度：O(log n) ~ O(n)
```

### 前端与树：遍历 JSON 的所有节点值
```
json.js
```

### 前端与树：渲染 Antd 中的树组件
```javascript
const { Tree } = antd;

const { TreeNode } = Tree;

const json = [
  {
    title: '一',
    key: '1',
    children: [{title: '三', key: '3', children: []}]
  },
  {
    title: '二',
    key: '2',
    children: [{title: '四', key: '4', children: []}]
  }
]

class Demo extends React.Component {
  dfs = (n) => {
    return (<TreeNode title={n.title} key={n.key}>
              {n.children.map(this.dfs)}
            </TreeNode>)
  }
  render() {
    return (
      <Tree>
        {json.map(this.dfs)}
      </Tree>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);

```
