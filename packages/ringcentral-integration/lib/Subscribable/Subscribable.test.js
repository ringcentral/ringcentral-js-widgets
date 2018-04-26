import { expect } from 'chai';
import Subscribable from '.';

describe('Subscribable', () => {
  it('should be a function', () => {
    expect(Subscribable).to.be.a('function');
  });
  it('should return a subscribable instance', () => {
    const sub = new Subscribable();
    expect(sub).to.exist;
    expect(sub instanceof Subscribable).to.be.true;
  });
  describe('subscribable instance', () => {
    it('should have a subscribe function', () => {
      const sub = new Subscribable();
      expect(sub.subscribe).to.be.a('function');
    });
    describe('subscribe', () => {
      it('should accept a handler function to the instance', () => {
        const sub = new Subscribable();
        const testFn = () => {};
        sub.subscribe(testFn);
        expect(sub._handlers.has(testFn)).to.be.true;
      });
      it('should return a unsubscriber function', () => {
        const sub = new Subscribable();
        const testFn = () => {};
        const unsubscriber = sub.subscribe(testFn);
        expect(unsubscriber).to.be.a('function');
        expect(() => {
          unsubscriber();
        }).to.not.throw();
        expect(sub._handlers.has(testFn)).to.be.false;
      });
      describe('subscribed function', () => {
        it('should be invoked when trigger function is invoked', () => {
          const sub = new Subscribable();
          let hasRun = false;
          const testFn = () => { hasRun = true; };
          sub.subscribe(testFn);
          sub.trigger();
          expect(hasRun).to.be.true;
        });
      });
    });
    it('should have a unsubscribe function', () => {
      const sub = new Subscribable();
      expect(sub.unsubscribe).to.be.a('function');
    });
    describe('unsubscribe', () => {
      it('should be able unsubscribe a subscribed function', () => {
        const sub = new Subscribable();
        const testFn = () => { };
        sub.subscribe(testFn);
        sub.unsubscribe(testFn);
        expect(sub._handlers.has(testFn)).to.be.false;
      });
      describe('unsubscribed function', () => {
        it('should not be invoke when trigger function is invoked', () => {
          const sub = new Subscribable();
          let hasRun = false;
          const testFn = () => { hasRun = true; };
          sub.subscribe(testFn);
          sub.unsubscribe(testFn);
          sub.trigger();
          expect(hasRun).to.be.false;
        });
      });
    });
    it('should have a trigger function', () => {
      const sub = new Subscribable();
      expect(sub.trigger).to.be.a('function');
    });
  });
});
