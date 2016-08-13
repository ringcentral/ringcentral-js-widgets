import { expect } from 'chai';
import { ActionMap, prefixActions } from '../../src/lib/redux-helper';

describe('ActionMap', () => {
  it('should be a constructor functon', () => {
    expect(ActionMap).to.be.a('function');
    expect(new ActionMap()).to.exist;
  });
  it('convers an array of strings to key-value maps', () => {
    const keys = [
      'foo',
      'bar',
    ];
    const actions = new ActionMap(keys);
    expect(Object.keys(actions)).to.deep.equal(keys);
    const ref = {};
    keys.forEach(key => {
      ref[key] = key;
    });
    expect(actions).to.deep.equal(ref);
  });
  it('should accept a prefix and prefix the action string', () => {
    const keys = [
      'foo',
      'bar',
    ];
    const prefix = 'eagle';
    const actions = new ActionMap(keys, prefix);
    expect(actions).to.deep.equal({
      foo: `${prefix}-foo`,
      bar: `${prefix}-bar`,
    });
  });
});

describe('prefixActions', () => {
  const actions = new ActionMap([
    'foo',
    'bar',
  ], 'eagle');
  it('should return a new action map with prefix', () => {
    const prefix = 'rogue';
    expect(prefixActions(actions, prefix))
      .to.deep.equal({
        foo: `${prefix}-eagle-foo`,
        bar: `${prefix}-eagle-bar`,
      });
  });
});
