# 栈

### 栈是什么?
- 一个`后进先出`的数据结构
- JavaScript 中没有栈，但可以用Array实现栈的所有功能。

### 栈的应用场景
- 需要`后进先出`的场景
- 比如：十进制转二进制、判断字符串的括号是否有效、函数调用堆栈...

#### 十进制转二进制
```
35
35 / 2 = 17 余数 1
17 / 2 = 8  余数 1
8  / 2 = 4  余数 0
4  / 2 = 2  余数 0
2  / 2 = 1  余数 0
1  / 2 = 0  余数 1
所以 35 转二进制 就是 100011
```
- 后出来的余数反而要排到前面
- 把余数依次入栈，然后再出栈，就可以实现余数倒叙输出

#### 有效的括号
```
(((()))) 有效
()()()   有效
(((())   无效
(()())   有效
```
- 越靠后的左括号，对应的右括号越靠前
- 左括号入栈，右括号出栈，最后栈空了就是合法

#### 函数调用堆栈
```javascript
function greeting() {
  // [1] some codes here
  sayHi()
  // [2] some codes here
}
function sayHi() {
  return 'hi'
}
// 调用 `greeting` 函数
greeting()
// [3] some codes here
```
- 最后调用的函数，最先执行完
- JS解释器使用栈来控制函数的调用顺序

### LeetCode：20.有效的括号
[link](https://leetcode-cn.com/problems/valid-parentheses/)

##### 解题思路
- 对于没有闭合的左括号而言，越靠后的左括号，对应的右括号越靠前
- 满足后进先出，考虑用栈

##### 解题步骤
```
输入：s = "()"
输出：true

输入：s = "()[]{}"
输出：true

输入：s = "(]"
输出：false

输入：s = "([)]"
输出：false
```
- 新建一个栈
- 扫描字符串，遇到左括号入栈，遇到和栈顶元素类型匹配的右括号就出栈，类型不匹配直接判定为不合法
- 最后栈空了就合法，否则不合法

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // 奇数
    if(s.length % 2 === 1) {
        return false
    }
    const stack = []
    for(let i = 0; i < s.length; i++) {
        const c = s[i]
        if(c === '(' || c === '[' || c === '{') {
            stack.push(c)
        }else {
            const t = stack[stack.length - 1]
            if(
                (t === '(' && c === ')') ||
                (t === '[' && c === ']') ||
                (t === '{' && c === '}')
            ){
                stack.pop()
            }else {
                return false
            }
        }
    }
    return stack.length === 0
};

// 时间复杂度 O(N)
// 空间复杂度 O(N)
```

### 前端与栈：JS中的函数调用堆栈
```javascript
// stack/callStack.js

```

### 总结
- 栈是一个 `后进先出` 的数据结构
- JavaScript 中没有栈，但可以用Array实现栈的所有功能。
- 栈常用操作 push pop stack[stack.length -1]


