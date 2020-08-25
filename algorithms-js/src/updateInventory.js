/*
Compare and update the inventory stored in a 2D array against a second 2D array of a fresh
delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be
found, add the new item and quantity into the inventory array. The returned inventory array should
be in alphabetical order by item.
*/
function updateInventory(arr1, arr2) {
  const currInvNames = arr1.reduce((p, v) => {
    p.push(v[1]);
    return p;
  }, []);

  arr1.map((el) => {
    const element = el;
    const item = arr2.filter((v) => v[1] === el[1]);
    if (item.length > 0) {
      const [[cnt]] = item;
      element[0] += cnt;
      return element;
    }
    return element;
  });

  arr2.forEach((el) => {
    if (!currInvNames.includes(el[1])) arr1.push(el);
  });

  return arr1.sort((a, b) => (a[1] > b[1] ? 1 : -1));
}

export {
  updateInventory as default,
};
