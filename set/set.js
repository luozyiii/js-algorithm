let mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add(5);
mySet.add('some text');

let o = {a:1, b:2}
mySet.add(o)
mySet.add({a:1, b:2})

const has = mySet.has(5)
const haso = mySet.has(o)

mySet.delete(5)

// 多种迭代方法
for (const item of mySet) {
    console.log(item)
}

for (const item of mySet.keys()) {
    console.log(item)
}

for (const item of mySet.values()) {
    console.log(item)
}

for (const [key, value] of mySet.entries()) {
    console.log(key, value)
}

// set 转 array
const myArr = [...mySet]
const myArr2 = Array.from(mySet)

// array 转 set
const mySet2 = new Set([1,2,3,4])

// 求交集
const intersetion = new Set([...mySet].filter(x => mySet2.has(x)))

// 求差集
const difference = new Set([...mySet].filter(x => !mySet2.has(x)))

console.log(mySet)