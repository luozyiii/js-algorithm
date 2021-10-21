const obj = {}
const func = () => {}
const arr = []

const obj1 = {}
Object.prototype.x = 'x'
console.log(obj1.x)

const instanceOf = (A, B) => {
    let p = A;
    while(p) {
        if(p === B.prototype) {
            return true
        }
        p = p.__proto__;
    }
    return false
}

console.log(1)

var foo = {},
F = function() {}

Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a) // value a
console.log(foo.b) // undefined

console.log(F.a)  // value a
console.log(F.b)  // value b