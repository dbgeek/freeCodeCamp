import permAlone from './permAlone';

describe.only('Test cases to permAlone function', () => {
  it('permAlone("aab")', () => {
    expect(permAlone('aab')).toEqual(2);
    expect(typeof permAlone('aab')).toBe('number');
  });

  it('permAlone("abc")', () => {
    expect(permAlone('abc')).toEqual(6);
  });

  it('permAlone("aaa")', () => {
    expect(permAlone('aaa')).toEqual(0);
    expect(typeof permAlone('aaa')).toBe('number');
  });

  it('permAlone("aabb")', () => {
    expect(permAlone('aabb')).toEqual(8);
  });

  it('permAlone("abcdefa")', () => {
    expect(permAlone('abcdefa')).toEqual(3600);
  });

  it('permAlone("abfdefa")', () => {
    expect(permAlone('abfdefa')).toEqual(2640);
  });

  it('permAlone("zzzzzzzz")', () => {
    expect(permAlone('zzzzzzzz')).toEqual(0);
  });

  it('permAlone("a")', () => {
    expect(permAlone('a')).toEqual(1);
  });

  it('permAlone("aaab")', () => {
    expect(permAlone('aaab')).toEqual(0);
  });

  it('permAlone("aaabb")', () => {
    expect(permAlone('aaabb')).toEqual(12);
  });
});
