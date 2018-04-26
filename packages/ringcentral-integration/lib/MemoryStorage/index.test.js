import { expect } from 'chai';
import MemoryStorage from './';

describe('MemoryStorage', () => {
  it('should be a constructor function', () => {
    expect(MemoryStorage).to.be.a('function');
    expect(() => new MemoryStorage()).to.not.throw();
    const instance = new MemoryStorage();
    expect(instance).to.exist;
    expect(instance instanceof MemoryStorage).to.be.true;
  });
  describe('MemoryStorage instance', () => {
    it('should have function getItem', () => {
      const instance = new MemoryStorage();
      expect(instance.getItem).to.be.a('function');
    });
    it('should have function setItem', () => {
      const instance = new MemoryStorage();
      expect(instance.setItem).to.be.a('function');
    });
    it('should have function removeItem', () => {
      const instance = new MemoryStorage();
      expect(instance.removeItem).to.be.a('function');
    });
    it('should behave similar to localStorage with getItem, setItem, and removeItem', () => {
      const instance = new MemoryStorage();
      instance.setItem('foo', 'bar');
      expect(instance.getItem('foo')).to.equal('bar');
      instance.removeItem('foo');
      expect(instance.getItem('bar')).to.be.undefined;
    });
    it('should have function key', () => {
      const instance = new MemoryStorage();
      expect(instance.key).to.be.a('function');
    });
    it('should have property length', () => {
      const instance = new MemoryStorage();
      expect(instance.length).to.be.a('number');
    });
    it('should have the correct length', () => {
      const instance = new MemoryStorage();
      [1, 2, 3, 4, 5].forEach(num => {
        instance.setItem(`foo-${num}`, `bar-${num}`);
        expect(instance.length).to.equal(num);
      });
    });
    it('should return storage keys with key function', () => {
      const instance = new MemoryStorage();
      [1, 2, 3, 4, 5].forEach((num, idx) => {
        instance.setItem(`foo-${num}`, `bar-${num}`);
        expect(instance.key(idx)).to.equal(`foo-${num}`);
      });
    });

  });
});
