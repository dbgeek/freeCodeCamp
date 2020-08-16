function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateBigArray(n) {
  const bigSet = new Set();
  while (bigSet.size < n) {
    bigSet.add(getRandomInt(n));
  }
  return [...(bigSet)];
}

const unsortedArray = generateBigArray(100000);
const sortedArray = [...unsortedArray].sort((a, b) => a - b);

export {
  sortedArray,
  unsortedArray,
};
