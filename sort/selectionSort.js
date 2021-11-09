Array.prototype.selectionSort = function() {
  for(let i = 0; i < this.length - 1; i++) {
    let minIndex = i;
    for(let j = i; j < this.length; j++) {
      if(this[j] < this[minIndex]) {
        minIndex = j
      }
    }
    if(minIndex !== i) {
      let temp = this[i];
      this[i] = this[minIndex];
      this[minIndex] = temp;
    }
  }
};

const arr = [5,4,3,2,1]
arr.selectionSort()
console.log('-----')
// 时间复杂度：两个嵌套循环 O(n^2)