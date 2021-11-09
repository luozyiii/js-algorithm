Array.prototype.bubbleSort = function() {
  // console.log(this)
  for(let i = 0; i < this.length - 1; i++) {
    for(let j = 0; j < this.length - 1 - i; j++) {
      if(this[j] > this[j + 1]) {
        let temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp
      }
    }
  }
};

const arr = [5,4,3,2,1]
arr.bubbleSort()
console.log('-----')
// 时间复杂度：两个嵌套循环 O(n^2)