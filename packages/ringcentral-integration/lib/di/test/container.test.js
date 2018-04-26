import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import Container from '../container';

chai.use(dirtyChai);

describe('Container', () => {
  class A {}
  class B {}
  describe('#has', () => {
    it('should search locally firstly', () => {
      const container = new Container();
      container.set('A', A);
      expect(container.has('A')).to.be.true();
    });

    it('should search from parent container', () => {
      const container = new Container();
      const parentContainer = new Container();
      container.set('A', A);
      parentContainer.set('B', B);
      container.setParent(parentContainer);
      expect(container.has('B')).to.be.true();
    });

    it('should return false when no record is found', () => {
      const container = new Container();
      expect(container.has('A')).to.be.false();
    });
  });

  describe('#get', () => {
    it('should search locally firstly', () => {
      const container = new Container();
      container.set('A', A);
      expect(container.get('A')).to.be.equal(A);
    });

    it('should search from parent container', () => {
      const container = new Container();
      const parentContainer = new Container();
      container.set('A', A);
      parentContainer.set('B', B);
      container.setParent(parentContainer);
      expect(container.get('B')).to.be.equal(B);
    });

    it('should throw an error when no record is found', () => {
      const container = new Container();
      const throws = () => container.get('A');
      expect(throws).to.throw('Cannot find provider [A] in Container');
    });
  });
});
