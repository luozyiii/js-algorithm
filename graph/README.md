# 图

### 图是什么?
- 图是`网络结构`的抽象模型，是一组由`边`连接的`节点`
- 图可以表示任何二元关系，比如道路、航班...
- JS 中没有图，但是可以用Object和Array构建图
- 图的表示法：邻接矩阵、邻接表、关联矩阵...

#### 图的表示法：邻接矩阵
```
A -> B -> C -> E -> D -> A
A -> B -> D -> A

// 邻接矩阵
  A B C D E
A 0 1 0 0 0
B 0 0 1 1 0
C 0 0 0 0 1
D 1 0 0 0 0
E 0 0 0 1 0
```

#### 图的表示法：邻接表
```
A -> B -> C -> E -> D -> A
A -> B -> D -> A

// 邻接表
{
    A: ["B"],
    B: ["C", "D"],
    C: ["E"],
    D: ["A],
    E: ["D]
}
```

#### 图的常用操作
- 深度优先遍历
- 广度优先遍历

### 图的深度广度优先遍历

#### 什么是深度/广度优先遍历？
- 深度优先遍历：尽可能深的搜索图的分支
- 广度优先遍历：先访问离根节点最近的节点

#### 深度优先遍历算法口诀
- 访问根节点
- 对根节点的`没访问过的相邻节点`挨个进行深度优先遍历

```
graph/dfs.js
```

#### 广度优先遍历算法口诀
- 新建一个队列，把根节点入队
- 把队头出队并访问
- 把队头的`没访问过的相邻节点`入队
- 重复第二、第三步，直到队列为空

```
graph/bfs.js
```

### LeetCode：65 有效数字
[link](https://leetcode-cn.com/problems/valid-number/)

#### 解题思路
![有效数字](./assets/youxiaoshuzi.png)

#### 解题步骤
- 构建一个表示状态的图
- 遍历字符串，并沿着图走，如果走到了某个节点无路可走就返回false
- 遍历结束，如走到3/5/6，就返回true，否则返回false

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    // 构建图
    const graph = {
        0: { 'blank': 0, 'sign': 1, '.': 2, 'digit': 6 },
        1: { 'digit': 6, '.': 2 },
        2: { 'digit': 3 },
        3: { 'digit': 3, 'e': 4},
        4: { 'digit': 5, 'sign': 7},
        5: { 'digit': 5},
        6: { 'digit': 6, '.': 3, 'e': 4},
        7: { 'digit': 5}
    }
    let state = 0;
    for(c of s.trim()) {
        if(c >= '0' && c <= '9') {
            c = 'digit';
        }else if(c === '') {
            c = 'blank';
        }else if(c === '+' || c === '-') {
            c = 'sign';
        }else if(c === 'E') {
            c = 'e'
        }
        state = graph[state][c];
        if(state === undefined) {
            return false;
        }
    }
    if([3,5,6].includes(state)) {
        return true;
    }
    return false;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
```

### LeetCode：417 太平洋大西洋水流问题
[link](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/)

#### 解题思路
```
给定下面的 5x5 矩阵:

  太平洋 ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * 大西洋

返回:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (上图中带括号的单元).
```
- 把矩阵想象成图
- 从海岸线`逆流而上`遍历图，所到之处就是可以流到某个大洋的坐标

#### 解题步骤
- 新建两个矩阵，分别记录能流到两个大洋的坐标
- 从海岸线，多管齐下，同时深度优先遍历图，过程中填充上述矩阵
- 遍历两个矩阵，找出能流到两个大洋的坐标

```javascript
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    if(!heights || !heights[0]) {return []};
    const m = heights.length;
    const n = heights[0].length;
    const flow1 = Array.from({length: m}, () => new Array(n).fill(false));
    const flow2 = Array.from({length: m}, () => new Array(n).fill(false));
    // console.log(flow1);
    // console.log(flow2);
    const dfs = (r, c, flow) => {
        flow[r][c] = true;
        [[r-1,c], [r+1,c],[r,c-1],[r,c+1]].forEach(([nr, nc])=> {
            // 保证在矩阵中
            // 防止死循环
            // 保证逆流而上
            if(
            nr >= 0 && nr < m && nc >= 0 && nc < n
            && !flow[nr][nc]
            && heights[nr][nc] >= heights[r][c]
            ) {
                dfs(nr, nc, flow)
            }
        })
    }

    // 沿着海岸线逆流而上
    for(let r = 0; r < m; r += 1) {
        dfs(r, 0, flow1);
        dfs(r, n - 1, flow2);
    }
    for(let c = 0; c < n; c += 1) {
        dfs(0, c, flow1);
        dfs(m - 1, c, flow2);
    }

    // 收集能流到两个大洋里的坐标
    const res = [];
    for(let r = 0; r < m; r++) {
        for(let c = 0; c < n; c++) {
            if(flow1[r][c] && flow2[r][c]) {
                res.push([r,c])
            }
        }
    }
    return res;
};
// 时间复杂度：O(m * n)
// 空间复杂度：O(m * n)
```

### LeetCode：133 克隆图
[link](https://leetcode-cn.com/problems/clone-graph/)

#### 解题思路
- 拷贝所有节点
- 拷贝所有的边

#### 解题步骤
- 深度或广度优先遍历所有节点
- 拷贝所有的节点，存储起来
- 将拷贝的节点，按照原图的连接方法进行连接

```javascript
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
// 深度优先遍历
var cloneGraph = function(node) {
    if(!node) return;
    const visited = new Map();
    const dfs = (n) => {
        const nCopy = new Node(n.val);
        visited.set(n, nCopy);
        (n.neighbors || []).forEach(ne => {
            if(!visited.has(ne)) {
                dfs(ne);
            }
            nCopy.neighbors.push(visited.get(ne));
        })
    }
    dfs(node)
    return visited.get(node)
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)


// 广度优先遍历
var cloneGraph = function(node) {
    if(!node) return;
    const visited = new Map();
    visited.set(node, new Node(node.val))
    const q = [node];
    while(q.length) {
        const n = q.shift();
        // console.log(n.val);
        (n.neighbors || []).forEach(ne => {
            if(!visited.has(ne)) {
                q.push(ne);
                visited.set(ne, new Node(ne.val));
            }
            visited.get(n).neighbors.push(visited.get(ne));
        })
    }
    return visited.get(node)
}
// 时间复杂度：O(n)
// 空间复杂度：O(n)
```