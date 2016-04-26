import { expect } from 'chai';

import Enum from '../../src/lib/enum';

/* global describe it */

describe('Enum', () => {
  it('should be a class function', () => {
    expect(Enum).to.be.a('function');
    const e = new Enum({ key: 'value' });
    expect(e).to.be.instanceOf(Enum);
  });
  // TODO: expand the test to fully test enum classes
  it('test', () => {
    class MyEnum extends Enum {
      constructor() {
        super({
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
        });
      }
    }

    const myEnum = new MyEnum();

    expect(myEnum.key1).to.equal('value1');
    expect(myEnum.key2).to.equal('value2');
    expect(myEnum.key3).to.equal('value3');
    expect(() => {
      myEnum.key2 = 'override';
    }).to.throw();

    const result = [];
    for (const key in myEnum) {
      if (myEnum.hasOwnProperty(key)) {
        result.push(key);
      }
    }
    expect(result).to.deep.equal(['key1', 'key2', 'key3']);
  });
});
