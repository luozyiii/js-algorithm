const bt = require('./bt')

// 递归版
const postorder = (root) => {
    if(!root) return
    postorder(root.left)
    postorder(root.right)
    console.log(root.val)
}
postorder(bt) // 4 5 2 6 7 3 1

console.log('-------------')

// 非递归版
const postorder2 = (root) => {
    if(!root) return
    const outputStack = [];
    const stack = [root];
    while(stack.length) {
        const n = stack.pop();
        outputStack.push(n)
        if(n.left) {
            stack.push(n.left)
        }
        if(n.right) {
            stack.push(n.right)
        }
    }
    console.log(outputStack)
    while(outputStack.length) {
        const n = outputStack.pop();
        console.log(n.val);
    }
}
postorder2(bt)

console.log('-------------')