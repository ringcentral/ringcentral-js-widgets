import { expect } from 'chai';
import validateAreaCode from '.';

describe('validateAreaCode', () => {
  it('should return true when areaCode is 650', () => {
    expect(validateAreaCode('650')).to.equal(true);
  });
  it('should return true when areaCode is ""', () => {
    expect(validateAreaCode('')).to.equal(true);
  });
  it('should return true when areaCode is " "', () => {
    expect(validateAreaCode(' ')).to.equal(true);
  });
  it('should return true when areaCode is "   "', () => {
    expect(validateAreaCode('   ')).to.equal(true);
  });
  it('should return true when areaCode is "    "', () => {
    expect(validateAreaCode('    ')).to.equal(true);
  });
  it('should return true when areaCode is undefined', () => {
    expect(validateAreaCode(undefined)).to.equal(true);
  });
  it('should return false when areaCode is null', () => {
    expect(validateAreaCode(null)).to.equal(false);
  });
  it('should return false when areaCode is "011"', () => {
    expect(validateAreaCode('011')).to.equal(false);
  });
  it('should return false when areaCode is "11"', () => {
    expect(validateAreaCode('11')).to.equal(false);
  });
  it('should return false when areaCode is "1122"', () => {
    expect(validateAreaCode('1122')).to.equal(false);
  });
});
