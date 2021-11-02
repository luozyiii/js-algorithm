const bt = require('./bt')

// 递归版
const inorder = (root) => {
    if(!root) return
    inorder(root.left)
    console.log(root.val)
    inorder(root.right)
}

inorder(bt) // 4 2 5 1 6 3 7

console.log('-------------')

// 非递归版 栈
const inorder2 = (root) => {
    if(!root) return
    const stack = [];
    let p = root;
    while(stack.length || p) {
        while(p) {
            stack.push(p);
            p = p.left;
        }
        const n = stack.pop();
        console.log(n.val);
        p = n.right
    }
}
inorder2(bt)
console.log('-------------')