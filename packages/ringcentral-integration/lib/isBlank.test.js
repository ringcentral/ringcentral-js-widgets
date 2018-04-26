import { expect } from 'chai';
import isBlank from './isBlank';

describe('isBlank', () => {
  it('should return true when string is blank', () => {
    expect(isBlank('')).to.equal(true);
  });

  it('should return true when string is null', () => {
    expect(isBlank(null)).to.equal(true);
  });

  it('should return true when string is undefined', () => {
    expect(isBlank()).to.equal(true);
  });

  it('should return true when string is one space', () => {
    expect(isBlank(' ')).to.equal(true);
  });

  it('should return true when string is multiply space', () => {
    expect(isBlank('  ')).to.equal(true);
  });

  it('should return false when string is not blank with number', () => {
    expect(isBlank('1')).to.equal(false);
  });

  it('should return false when string is not blank with letter', () => {
    expect(isBlank('aa')).to.equal(false);
  });

  it('should return false when string is not blank with letter and space', () => {
    expect(isBlank('aa ')).to.equal(false);
  });
});
