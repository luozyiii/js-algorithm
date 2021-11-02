const bt = require('./bt')

// 递归版
const preorder = (root) => {
    if(!root) return
    console.log(root.val);
    preorder(root.left)
    preorder(root.right)
}
preorder(bt) // 1 2 4 5 3 6 7
console.log('-------------')

// 非递归版 栈
const preorder2 = (root) => {
    if(!root) return
    const stack = [root];
    while(stack.length) {
        const n = stack.pop();
        console.log(n.val);
        if(n.right) {
            stack.push(n.right)
        }
        if(n.left) {
            stack.push(n.left)
        }
    }
}
preorder2(bt)
console.log('-------------')