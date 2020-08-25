/*
The mathematical term symmetric difference (△ or ⊕) of two sets is the set of elements which are
in either of the two sets but not in both. For example, for sets A = {1, 2, 3} and
B = {2, 3, 4}, A △ B = {1, 4}.

Symmetric difference is a binary operation, which means it operates on only two elements. So to
evaluate an expression involving symmetric differences among three elements (A △ B △ C), you must
complete one operation at a time. Thus, for sets A and B above,
and C = {2, 3}, A △ B △ C = (A △ B) △ C = {1, 4} △ {2, 3} = {1, 2, 3, 4}.

Create a function that takes two or more arrays and returns an array of their symmetric difference.
The returned array must contain only unique values (no duplicates).
*/

/**
* takes two or more arrays and returns an array of their symmetric difference.
* @param {Array} args - two or more arrays to do symmetric difference.
* @returns {Array} returns unique array of their symmetric difference
*/
function sym(...args) {
  return [
    ...new Set(args.reduce((a1, a2) => [
      ...a1.filter((e) => !a2.includes(e)),
      ...a2.filter((e) => !a1.includes(e)),
    ])),
  ].sort((a, b) => a - b);
}

export {
  sym as default,
};
