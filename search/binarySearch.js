// 数组必须是有序的，假设数组都是有序
Array.prototype.binarySearch = function(item) {
    let low = 0;
    let high = this.length - 1;
    while(low <= high) {
        const mid = Math.floor((low + high) / 2);
        const element = this[mid];
        if(element < item) {
            low = mid + 1
        }else if(element > item) {
            high = mid - 1
        }else {
            return mid
        }
    }
    return -1
}

const res = [1,2,3,4,5].binarySearch(3)
console.log('-----')
// 时间复杂度：O(log n)
// 每一次比较都使搜索范围缩小一半