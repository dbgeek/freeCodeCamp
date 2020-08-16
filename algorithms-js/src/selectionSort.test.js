import { sortedArray, unsortedArray } from './bigArray';
import selectionSort from './selectionSort';

test('selection sort test2 sorted unsorted array', () => {
  expect(selectionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))
    .toEqual([1, 1, 2, 2, 4, 8, 32, 43, 43, 55, 63, 92, 123, 123, 234, 345, 5643]);
});

test('selection sort test2 sorted array', () => {
  expect(selectionSort([0, 1]))
    .toEqual([0, 1]);
});

test('selection sort test2 unsorted big array', () => {
  expect(selectionSort(unsortedArray))
    .toEqual(sortedArray);
});
