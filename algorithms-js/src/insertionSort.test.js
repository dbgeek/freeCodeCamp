import { sortedArray, unsortedArray } from './bigArray';
import insertionSort from './insertionSort';

test('insertionSort sort test1 sorted unsorted array', () => {
  expect(insertionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))
    .toEqual([1, 1, 2, 2, 4, 8, 32, 43, 43, 55, 63, 92, 123, 123, 234, 345, 5643]);
});

test('insertionSort sort test2 sorted array', () => {
  expect(insertionSort([0, 1]))
    .toEqual([0, 1]);
});

test('insertionSort sort test3 unsorted  3 length array', () => {
  expect(insertionSort([2, 1, 0]))
    .toEqual([0, 1, 2]);
});

test('insertionSort sort test4 unsorted big array', () => {
  expect(insertionSort(unsortedArray))
    .toEqual(sortedArray);
});
