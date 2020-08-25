import pairwise from './pairwise';

describe.only('Test case to pairwise function', () => {
  it('pairwise should return 11', () => {
    expect(pairwise([1, 4, 2, 3, 0, 5], 7)).toEqual(11);
  });
  it('pairwise should return 1', () => {
    expect(pairwise([1, 3, 2, 4], 4)).toEqual(1);
  });
  it('pairwise should return 1', () => {
    expect(pairwise([1, 1, 1], 2)).toEqual(1);
  });
  it('pairwise should return 10', () => {
    expect(pairwise([0, 0, 0, 0, 1, 1], 1)).toEqual(10);
  });
  it('pairwise should return 0', () => {
    expect(pairwise([], 100)).toEqual(0);
  });
});
