import { sortedArray, unsortedArray } from './bigArray';
import {
  quickSort, quickSortLomuto, quickSortHoare,
} from './quickSort';

test('quickSort sort test1 sorted unsorted array', () => {
  expect(quickSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))
    .toEqual([1, 1, 2, 2, 4, 8, 32, 43, 43, 55, 63, 92, 123, 123, 234, 345, 5643]);
});

test('quickSort sort test2 sorted array', () => {
  expect(quickSort([0, 1]))
    .toEqual([0, 1]);
});

test('quickSort sort test3 unsorted  3 length array', () => {
  expect(quickSort([2, 1, 0]))
    .toEqual([0, 1, 2]);
});

test('quickSort sort test4 unsorted big array', () => {
  expect(quickSort([...unsortedArray]))
    .toEqual(sortedArray);
});

test('quickSortLomuto sort test1 sorted unsorted unique array', () => {
  expect(quickSortLomuto([
    1, 4, 2, 8, 345, 123, 43, 32, 5643,
    63, 123, 43, 2, 55, 234, 92, 5, 6, 7,
  ]))
    .toEqual([1, 2, 2, 4, 5, 6, 7, 8, 32, 43, 43, 55, 63, 92, 123, 123, 234, 345, 5643]);
});

test('quickSortLomuto sort test1 sorted unsorted array', () => {
  expect(quickSortLomuto([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))
    .toEqual([1, 1, 2, 2, 4, 8, 32, 43, 43, 55, 63, 92, 123, 123, 234, 345, 5643]);
});

test('quickSortLomuto sort test4 unsorted big array', () => {
  expect(quickSortLomuto([...unsortedArray]))
    .toEqual(sortedArray);
});

test('quickSortLomuto sort test2 sorted array', () => {
  expect(quickSortLomuto([0, 1]))
    .toEqual([0, 1]);
});

test('quickSortHoare sort test1 sorted unsorted unique array', () => {
  expect(quickSortHoare([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 234, 92, 5, 6, 7]))
    .toEqual([1, 2, 2, 4, 5, 6, 7, 8, 32, 43, 43, 55, 63, 92, 123, 123, 234, 345, 5643]);
});

test('quickSortHoare sort test4 unsorted big array', () => {
  expect(quickSortHoare([...unsortedArray]))
    .toEqual(sortedArray);
});

test('quickSortHoare sort test2 sorted array', () => {
  expect(quickSortHoare([0, 1]))
    .toEqual([0, 1]);
});
