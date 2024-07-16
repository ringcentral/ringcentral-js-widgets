import { formatDuration } from '.';
import { expect } from 'chai';

describe('formatDuration', () => {
  it('should be a function', () => {
    expect(formatDuration).to.be.a('function');
  });
  const pairs = {
    '00:00': 0,
    '00:01': 1,
    '00:59': 59,
    '01:00': 60,
    '01:01': 61,
    '01:59': 119,
    '10:00': 600,
    '11:00': 660,
    '01:00:00': 3600,
    '10:00:00': 36000,
  };
  describe('formatDuration with number or string type value', () => {
    it('formatted string should be expected', () => {
      Object.entries(pairs).forEach(([result, duration]) => {
        expect(formatDuration(duration)).to.equal(result);
        expect(formatDuration(duration.toString())).to.equal(result);
      });
    });
  });
  describe('formatDuration with NaN or undefined', () => {
    it('formatted string should be expected', () => {
      expect(formatDuration(NaN)).to.equal('--:--');
      expect(formatDuration(undefined)).to.equal('--:--');
    });
  });
});
