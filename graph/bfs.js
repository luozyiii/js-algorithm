const graph = require('./graph')

const visited = new Set(); // 记录访问过的节点
visited.add(2)
const q = [2]; // 队列

while(q.length) {
    const n = q.shift();
    console.log(n);
    graph[n].forEach(c => {
        if(!visited.has(c)) {
            q.push(c);
            visited.add(c);
        }
    });
}
// 2 0 3 1
console.log('-----')