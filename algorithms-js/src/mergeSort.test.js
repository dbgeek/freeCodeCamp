import { sortedArray, unsortedArray } from './bigArray';
import { mergeSort1, mergeSort2 } from './mergeSort';

test('mergSort1 sort test1 sorted unsorted array', () => {
  expect(mergeSort1([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))
    .toEqual([1, 1, 2, 2, 4, 8, 32, 43, 43, 55, 63, 92, 123, 123, 234, 345, 5643]);
});

test('mergSort1 sort test2 sorted array', () => {
  expect(mergeSort1([0, 1]))
    .toEqual([0, 1]);
});

test('mergSort1 sort test3 unsorted big array', () => {
  expect(mergeSort1([...unsortedArray]))
    .toEqual(sortedArray);
});

test('mergSort2 sort test1 sorted unsorted array', () => {
  expect(mergeSort2([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))
    .toEqual([1, 1, 2, 2, 4, 8, 32, 43, 43, 55, 63, 92, 123, 123, 234, 345, 5643]);
});

test('mergSort2 sort test2 sorted array', () => {
  expect(mergeSort2([0, 1]))
    .toEqual([0, 1]);
});

test('mergSort2 sort test3 unsorted big array', () => {
  expect(mergeSort2([...unsortedArray]))
    .toEqual(sortedArray);
});
