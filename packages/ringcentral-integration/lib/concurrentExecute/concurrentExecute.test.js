import { expect } from 'chai';
import sinon from 'sinon';
import concurrentExecute from '.';

describe('concurrentExecute', () => {
  let oddValues;
  let evenValues;
  beforeEach(() => {
    oddValues = [1, 2, 3, 4, 5, 6, 7];
    evenValues = [1, 2, 3, 4, 5, 6];
  });

  it('should work when have odd length of thunks', async () => {
    const thunks = oddValues.map(v => () => v);
    const options = {
      delayFn: () => {},
      promise: {
        all: v => v
      }
    };
    sinon.spy(options.promise, 'all');
    const result = await concurrentExecute(thunks, 2, 0, options);
    expect(result).to.deep.equal(oddValues);
    expect(options.promise.all.callCount).to.equal(4);
  });

  it('should work when have even length of thunks', async () => {
    const thunks = evenValues.map(v => () => v);
    const options = {
      delayFn: () => {},
      promise: {
        all: v => v
      }
    };
    sinon.spy(options.promise, 'all');
    const result = await concurrentExecute(thunks, 2, 0, options);
    expect(result).to.deep.equal(evenValues);
    expect(options.promise.all.callCount).to.equal(3);
  });

  it('should actually be delayed between promise parallel', async () => {
    const thunks = oddValues.map(v => () => v);
    const concurrency = 2;
    const promise = {
      all: v => v
    };
    sinon.spy(promise, 'all');
    let callCount = 1;
    const options = {
      delayFn: () => {
        expect(promise.all.callCount).to.equal(callCount);
        callCount += 1;
      },
      promise
    };
    const result = await concurrentExecute(thunks, concurrency, 1, options);
    expect(result).to.deep.equal(oddValues);
  });
});
