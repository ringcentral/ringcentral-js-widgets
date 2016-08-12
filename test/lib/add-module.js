import { expect } from 'chai';

import addModule from '../../src/lib/add-module';

/* global describe it */

describe('add-module', () => {
  it('should be a class function', () => {
    expect(addModule).to.be.a('function');
  });
  it('should add a named property as own property', () => {
    const dummy = {};
    const module = {};
    dummy::addModule('prop', module);
    expect(dummy).to.have.ownProperty('prop');
  });
  it('should add an object as named property', () => {
    const dummy = {};
    const module = {
      a: {
        b: 'b',
      },
    };
    dummy::addModule('prop', module);
    expect(dummy.prop).to.deep.equal(module);
  });
  it('should throw exception when adding object with existed name', () => {
    const dummy = {};
    const module1 = {};
    const module2 = {};
    const fn = function () {
      dummy::addModule('prop', module1);
      dummy::addModule('prop', module2);
    };
    expect(fn).to.throw(Error);
  });
});
