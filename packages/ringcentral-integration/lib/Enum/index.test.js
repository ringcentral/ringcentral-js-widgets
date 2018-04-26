import { expect } from 'chai';
import Enum, { prefixEnum } from './';

describe('Enum', () => {
  it('should be a constructor functon', () => {
    expect(Enum).to.be.a('function');
    expect(new Enum()).to.exist;
  });
  it('convers an array of strings to key-value maps', () => {
    const keys = [
      'foo',
      'bar',
    ];
    const enumMap = new Enum(keys);
    expect(Object.keys(enumMap)).to.deep.equal(keys);
    const ref = {};
    keys.forEach(key => {
      ref[key] = key;
    });
    expect(enumMap).to.deep.equal(ref);
  });
  it('should accept a prefix and prefix the enum value string', () => {
    const keys = [
      'foo',
      'bar',
    ];
    const prefix = 'eagle';
    const enumMap = new Enum(keys, prefix);
    expect(enumMap).to.deep.equal({
      foo: `${prefix}-foo`,
      bar: `${prefix}-bar`,
    });
  });
});

describe('prefixEnum', () => {
  const enumMap = new Enum([
    'foo',
    'bar',
  ], 'eagle');
  it('should return a new enum map with prefix', () => {
    const prefix = 'rogue';
    expect(prefixEnum({ enumMap, prefix }))
      .to.deep.equal({
        foo: `${prefix}-eagle-foo`,
        bar: `${prefix}-eagle-bar`,
      });
  });
  it('should cache prefixed enumMap', () => {
    const prefix = 'rogue';
    expect(prefixEnum({ enumMap, prefix }))
      .to.equal(prefixEnum({ enumMap, prefix }));
  });
  it('should return original enumMap if prefix is undefined', () => {
    expect(prefixEnum({ enumMap })).to.equal(enumMap);
  });
});
