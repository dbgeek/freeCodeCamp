/*
Another common intermediate sorting algorithm is merge sort. Like quick sort, merge sort also uses
a divide-and-conquer, recursive methodology to sort an array. It takes advantage of the fact that
it is relatively easy to sort two arrays as long as each is sorted in the first place. But we'll
start with only one array as input, so how do we get to two sorted arrays from that? Well, we can
recursively divide the original input in two until we reach the base case of an array with one
item. A single-item array is naturally sorted, so then we can start combining. This combination
will unwind the recursive calls that split the original array, eventually producing a final sorted
array of all the elements. The steps of merge sort, then, are:

1) Recursively split the input array in half until a sub-array with only one element is produced.
2) Merge each sorted sub-array together to produce the final sorted array.

Merge sort is an efficient sorting method, with time complexity of O(nlog(n)). This algorithm is
popular because it is performant and relatively easy to implement.

As an aside, this will be the last sorting algorithm we cover here. However, later in the section
on tree data structures we will describe heap sort, another efficient sorting method that requires
a binary heap in its implementation.

Instructions: Write a function mergeSort which takes an array of integers as input and returns an
array of these integers in sorted order from least to greatest. A good way to implement this is to
write one function, for instance merge, which is responsible for merging two sorted arrays, and
another function, for instance mergeSort, which is responsible for the recursion that produces
single-item arrays to feed into merge. Good luck!

Note:
We are calling this function from behind the scenes; the test array we are using is commented out
in the editor. Try logging array to see your sorting algorithm in action!
*/
function merge(left, right) {
  const sorted = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }
  return sorted.concat(left.slice(), right.slice());
}

function mergeSort1(array) {
  if (array.length <= 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const left = mergeSort1(array.splice(0, mid));
  const right = mergeSort1(array);
  return merge(left, right);
}

function mergeSort2Helper(arr, startIdx, midIdx, endIdx, aux) {
  const array = arr;
  let idx = startIdx;
  let leftIdx = startIdx;
  let rightIdx = midIdx + 1;

  while (leftIdx <= midIdx && rightIdx <= endIdx) {
    if (aux[leftIdx] <= aux[rightIdx]) {
      array[idx] = aux[leftIdx];
      leftIdx += 1;
    } else {
      array[idx] = aux[rightIdx];
      rightIdx += 1;
    }
    idx += 1;
  }

  while (leftIdx <= midIdx) {
    array[idx] = aux[leftIdx];
    idx += 1;
    leftIdx += 1;
  }
  while (rightIdx <= endIdx) {
    array[idx] = aux[rightIdx];
    idx += 1;
    rightIdx += 1;
  }
}

function mergeSort2Worker(arr, startIdx, aux, endIdx) {
  if (startIdx === endIdx) {
    return;
  }
  const mid = Math.floor((startIdx + endIdx) / 2);
  mergeSort2Worker(aux, startIdx, arr, mid);
  mergeSort2Worker(aux, mid + 1, arr, endIdx);

  mergeSort2Helper(arr, startIdx, mid, endIdx, aux);
}

function mergeSort2(array) {
  const aux = [...array];
  mergeSort2Worker(array, 0, aux, aux.length - 1);
  return array;
}

export {
  mergeSort1,
  mergeSort2,
};
