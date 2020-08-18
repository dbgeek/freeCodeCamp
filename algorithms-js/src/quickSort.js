/*
https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
Here we will move on to an intermediate sorting algorithm: quick sort. Quick sort is an efficient,
recursive divide-and-conquer approach to sorting an array. In this method, a pivot value is
chosen in the original array. The array is then partitioned into two subarrays of values less than
and greater than the pivot value. We then combine the result of recursively calling the quick sort
algorithm on both sub-arrays. This continues until the base case of an empty or single-item array
is reached, which we return. The unwinding of the recursive calls return us the sorted array.

Quick sort is a very efficient sorting method, providing O(nlog(n)) performance on average.It is
also relatively easy to implement. These attributes make it a popular and useful sorting method.

Instructions: Write a function quickSort which takes an array of integers as input and returns
an array of these integers in sorted order from least to greatest. While the choice of the pivot
value is important, any pivot will do for our purposes here. For simplicity, the first or last
element could be used.

Note:
We are calling this function from behind the scenes; the test array we are using is commented
out in the editor. Try logging array to see your sorting algorithm in action!
*/
function swap(list, a, b) {
  const l = list;
  [l[a], l[b]] = [l[b], l[a]];
}

function quickSort(array) {
  if (array.length < 2) {
    return array;
  }
  const pivot = array[0];
  const lesserArray = [];
  const greaterArray = [];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > pivot) {
      greaterArray.push(array[i]);
    } else {
      lesserArray.push(array[i]);
    }
  }

  return quickSort(lesserArray).concat(pivot, quickSort(greaterArray));
}

/*
This scheme is attributed to Nico Lomuto and popularized by Bentley in his book Programming
Pearls[14] and Cormen et al. in their book Introduction to Algorithms. This scheme chooses a
pivot that is typically the last element in the array. The algorithm maintains index i as it scans
the array using another index j such that the elements at lo through i-1 (inclusive) are less than
the pivot, and the elements at i through j (inclusive) are equal to or greater than the pivot.
As this scheme is more compact and easy to understand, it is frequently used in introductory
material, although it is less efficient than Hoare's original scheme e.g., when all elements are
equal. This scheme degrades to O(n2) when the array is already in order.[9] There have been various
variants proposed to boost performance including various ways to select pivot, deal with equal
elements, use other sorting algorithms such as Insertion sort for small arrays and so on. In
pseudocode, a quicksort that sorts elements at lo through hi (inclusive) of an array A can be
expressed
*/
function lomutoPartition(a, lo, hi) {
  const pivot = a[hi];
  let pointer = lo;
  for (let j = lo; j <= hi; j++) {
    if (a[j] < pivot) {
      swap(a, pointer, j);
      pointer += 1;
    }
  }
  swap(a, pointer, hi);
  return pointer;
}

function quickSortLomuto(a, lo = 0, hi = a.length - 1) {
  if (lo < hi) {
    const p = lomutoPartition(a, lo, hi);
    quickSortLomuto(a, lo, p - 1);
    quickSortLomuto(a, p + 1, hi);
  }
  return a;
}

/*
https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
The original partition scheme described by C.A.R. Hoare uses two indices that start at the ends
of the array being partitioned, then move toward each other, until they detect an inversion:
a pair of elements, one greater than or equal to the pivot, one less than or equal, that are in
the wrong order relative to each other. The inverted elements are then swapped.[17] When the
indices meet, the algorithm stops and returns the final index. Hoare's scheme is more efficient
than Lomuto's partition scheme because it does three times fewer swaps on average, and it creates
efficient partitions even when all values are equal.[9][self-published source?] Like Lomuto's
partition scheme, Hoare's partitioning also would cause Quicksort to degrade to O(n2) for already
sorted input, if the pivot was chosen as the first or the last element. With the middle element as
the pivot, however, sorted data results with (almost) no swaps in equally sized partitions leading
to best case behavior of Quicksort, i.e. O(n log(n)). Like others, Hoare's partitioning doesn't
produce a stable sort. In this scheme, the pivot's final location is not necessarily at the index
that is returned, as the pivot and elements equal to the pivot can end up anywhere within the
partition after a partition step, and may not be sorted until the base case of a partition with a
single element is reached via recursion. The next two segments that the main algorithm recurs on
are (lo..p) (elements ≤ pivot) and (p+1..hi) (elements ≥ pivot) as opposed to (lo..p-1) and
(p+1..hi) as in Lomuto's scheme. However, the partitioning algorithm guarantees lo ≤ p < hi which
implies both resulting partitions are non-empty, hence there's no risk of infinite recursion.
In pseudocode,[15]
*/
function hoarePartition(a, lo, hi) {
  const pivot = a[Math.floor((lo + hi) / 2)];
  let i = lo;
  let j = hi;

  while (i <= j) {
    while (a[i] < pivot) {
      i += 1;
    }
    while (a[j] > pivot) {
      j -= 1;
    }
    if (i <= j) {
      swap(a, i, j);
      i += 1;
      j -= 1;
    }
  }
  return i;
}

function quickSortHoare(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return [];
  const p = hoarePartition(a, lo, hi);
  quickSortHoare(a, lo, p - 1);
  quickSortHoare(a, p, hi);

  return a;
}

export {
  quickSort,
  quickSortLomuto,
  quickSortHoare,
};
