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

// 非递归版 栈-后进先出
const inorder2 = (root) => {
    if(!root) return
    const stack = [];
    let p = root;
    while(stack.length || p) {
        while(p) {
            stack.push(p);
            p = p.left;
        }
        console.log(stack)
        const n = stack.pop();
        console.log(n.val);
        p = n.right
    }
}
inorder2(bt)
console.log('-------------')


// 入栈 左 -> 右
// 出栈 左 -> 中 -> 右
var inorderTraversal = function(root, res = []) {
    const stack = [];
    let cur = root; // 指针
    while(stack.length || cur) {
        if(cur) {
            stack.push(cur);
            // 左
            cur = cur.left;
        } else {
            // --> 弹出 中
            cur = stack.pop();
            res.push(cur.val); 
            // 右
            cur = cur.right;
        }
    };
    return res;
};
console.log(inorderTraversal(bt))