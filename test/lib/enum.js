import { expect } from 'chai';

import Enum from '../../src/lib/enum';

/* global describe it */

describe('enum', () => {
  it('should be a class function', () => {
    expect(Enum).to.be.a('function');
    const e = new Enum({ key: 'value' });
    expect(e).to.be.instanceOf(Enum);
  });
  class TestEnum extends Enum {
    constructor() {
      super({
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      });
    }
  }
  const testEnum = new TestEnum();
  it('should add keys as own properties to subclass', () => {
    expect(testEnum).to.have.ownProperty('key1');
    expect(testEnum).to.have.ownProperty('key2');
    expect(testEnum).to.have.ownProperty('key3');
  });
  it('should add values as values of properties to subclass', () => {
    expect(testEnum.key1).to.equal('value1');
    expect(testEnum.key2).to.equal('value2');
    expect(testEnum.key3).to.equal('value3');
  });
  it('should not allow values of properties modified from outside', () => {
    expect(() => {
      testEnum.key2 = 'override';
    }).to.throw();
  });
});
