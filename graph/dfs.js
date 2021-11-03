const graph = require('./graph')

const visited = new Set(); // 记录访问过的节点
const dfs = (n) => {
    console.log(n);
    visited.add(n);
    graph[n].forEach(c => {
        if(!visited.has(c)){
            dfs(c);
        }
    })
}

dfs(2); // 2 0 1 3
console.log('-----')