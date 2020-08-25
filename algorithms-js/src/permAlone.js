/*
Return the number of total permutations of the provided string that don't have repeated
consecutive letters. Assume that all characters in the provided string are each unique.

For example, aab should return 2 because it has 6 total permutations
(aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter
(in this case a) repeating.
*/
function getPermutation(arr, int, permutations = []) {
  const a = arr;
  if (int === 1) {
    // Make sure to join the characters as we create  the permutation arrays
    permutations.push(arr.join(''));
  } else {
    for (let i = 0; i !== int; ++i) {
      getPermutation(a, int - 1, permutations);
      const index1 = int % 2 ? 0 : i;
      const index2 = int - 1;
      [a[index1], a[index2]] = [a[index2], a[index1]];
    }
  }
  return permutations;
}

function permAlone(str) {
  // Create a regex to match repeated consecutive characters.
  const regex = /(.)\1+/;

  // Split the string into an array of characters.
  const arr = str.split('');

  // Return 0 if str contains same character.
  if (str.match(regex) !== null && str.match(regex)[0] === str) return 0;

  const permutations = getPermutation(arr, arr.length);
  const filtered = permutations.filter((string) => !string.match(regex));
  // Return how many have no repetitions.
  return filtered.length;
}

export {
  permAlone as default,
};
