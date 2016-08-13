import { expect } from 'chai';
import addModule from '../../src/lib/add-module';

describe('addModule', () => {
  it('should be a function', () => {
    expect(addModule).to.be.a('function');
  });
  it('should define the module as a named property of the target', () => {
    const target = {};
    const module = {};
    const name = 'foo';
    target::addModule(name, module);
    expect(target).to.have.ownProperty(name);
    expect(target[name]).to.equal(module);
  });
  it('should throw error when trying to add another module with the same name', () => {
    const target = {};
    const module1 = {};
    const module2 = {};
    const name = 'foo';
    target::addModule(name, module1);
    expect(() => {
      target::addModule(name, module2);
    }).to.throw(`module '${name}' already exists...`);
  });
});
