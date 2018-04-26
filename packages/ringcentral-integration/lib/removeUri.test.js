import { expect } from 'chai';
import removeUri from './removeUri';

describe('removeUri', () => {
  it('should return object without uri key', () => {
    const data = { uri: '1234', key: 1 };
    expect(removeUri(data)).to.deep.equal({ key: 1 });
  });

  it('should not change data if object not include uri', () => {
    const data = { key: 1 };
    expect(removeUri(data)).to.deep.equal(data);
  });
});
