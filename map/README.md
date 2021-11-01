# 字典

### 字典是什么?
- 与集合类似，字典也是一种存储唯一值的数据结构，但它是以`键值对`的形式来存储
- ES6 中有字典，名为Map
- 字典的常用操作：键值对的增删改查

### LeetCode：349 两个数组的交集
[link](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

#### 解题思路
- 求 nums1 和 nums2 都有的值
- 用字典建立一个映射关系，记录 nums1 里面有的值
- 遍历 nums2, 找出 nums1 里面也有的值

#### 解题步骤
- 新建一个字典，遍历 nums1 ,填充字典
- 遍历 nums2 ，遇到字典里的值就选出，并从字典中删除

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    const m = new Map(); // 字典
    nums1.forEach(n => {
        m.set(n,true)
    })
    const res = [];
    nums2.forEach(n => {
        if(m.get(n)){
            res.push(n)
            m.delete(n)
        }
    })
    return res
};
// 时间复杂度：O(m + n)
// 空间复杂度：O(m)
```

### LeetCode：20 有效的括号
[link](https://leetcode-cn.com/problems/valid-parentheses/)

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
    const map = new Map();
    map.set('(', ')');
    map.set('{', '}');
    map.set('[', ']');
    for(let i = 0; i < s.length; i++) {
        const c = s[i]
        if(map.has(c)) {
            stack.push(c)
        }else {
            const t = stack[stack.length - 1]
            if(map.get(t) === c){
                stack.pop()
            }else {
                return false
            }
        }
    }
    return stack.length === 0
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

### LeetCode：1 两数之和
[link](https://leetcode-cn.com/problems/two-sum/)

#### 解题思路
- 把 nums 想象成相亲者
- 把 target 想象成匹配条件
- 用字典建立一个婚姻介绍所，存储相亲者的数字和下标

#### 解题步骤
- 新建一个字典作为婚姻介绍所
- nums 里的值，逐个来介绍所找对象，没有合适的就先登记着，有合适的就牵手成功

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0; i < nums.length; i++) {
        const n = nums[i]
        const m = target - n
        if(map.has(m)) {
            return [map.get(m), i]
        }else {
            map.set(n, i)
        }
    }
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

### LeetCode：3 无重复字符的最长子串
[link](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

#### 解题思路
- 先找出所有不包含重复字符的子串
- 找出长度最大哪个子串，返回其长度即可

#### 解题步骤
- 用双指针维护一个滑动窗口，用来剪切子串
- 不断移动右指针，遇到重复字符，就把左指针移动到重复字符的下一位。
- 过程中，记录所有窗口的长度，并返回最大值

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let l = 0;
    let res = 0;
    const map = new Map();
    for(let r = 0; r < s.length; r++) {
        if(map.has(s[r]) && map.get(s[r]) >= l){
            l = map.get(s[r]) + 1
        }
        res = Math.max(res, r - l + 1);
        map.set(s[r], r)
    }
    return res
};
// 时间复杂度：O(n)
// 空间复杂度：O(m), m 是字符串中不重复字符的个数
```

### 76 最小覆盖子串
[link](https://leetcode-cn.com/problems/minimum-window-substring/)

#### 解题思路
- 先找出所有的包含T的子串
- 找出长度最小的那个子串，返回即可

#### 解题步骤
- 用双指针维护一个滑动窗口
- 移动右指针，找到包含T的子串，移到左指针，尽量减少包含T的子串的长度
- 循环上述过程，找出包含T的最小子串

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let l = 0;
    let r = 0;
    const need = new Map();
    for(let c of t) {
        need.set(c, need.has(c) ? need.get(c) + 1 : 1)
    }
    // console.log(need)
    let needType = need.size;
    let res = ''; // 记录最小的子串
    while(r < s.length) {
        const c = s[r]
        if(need.has(c)) {
            need.set(c, need.get(c) - 1);
            if(need.get(c) === 0) {
                needType --
            }
        }
        while(needType === 0) {
            // console.log(s.substring(l, r + 1))
            const newRes = s.substring(l, r + 1);
            if(!res || newRes.length < res.length){
                res = newRes
            }
            const c2 = s[l]
            if(need.has(c2)) {
                need.set(c2, need.get(c2) + 1)
                if(need.get(c2) === 1) {
                    needType ++
                }
            }
            l++
        }

        r++;
    }
    return res
};
// 时间复杂度：O(m+n), m 是 t 的长度，n是s的长度
// 空间复杂度：O(k), k 是 t 里面不同字符的个数
```