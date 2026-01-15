import { expect } from 'chai';

import { backoffDelay, isRetirableStatus } from './fetchWithRetry';

describe('backoffDelay', () => {
  it('should return 1000ms for the first retry', () => {
    expect(backoffDelay(0)).to.equal(1000);
  });

  it('should return 2000ms for the second retry', () => {
    expect(backoffDelay(1)).to.equal(2000);
  });

  it('should return 4000ms for the third retry', () => {
    expect(backoffDelay(2)).to.equal(4000);
  });

  it('should return 8000ms for the fourth retry', () => {
    expect(backoffDelay(3)).to.equal(8000);
  });

  it('should return 16000ms for the fifth retry', () => {
    expect(backoffDelay(4)).to.equal(16000);
  });
});

describe('isRetirableStatus', () => {
  it('should return true for status 500 <599', () => {
    for (let i = 500; i < 600; i++) {
      expect(isRetirableStatus(i)).to.equal(true);
    }
  });

  it('should return true for status 429', () => {
    expect(isRetirableStatus(429)).to.equal(true);
  });

  it('should return false for status <500', () => {
    for (let i = 200; i < 500; i++) {
      expect(isRetirableStatus(i)).to.equal(i === 429 ? true : false);
    }
  });
});
