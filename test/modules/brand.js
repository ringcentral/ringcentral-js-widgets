import { expect } from 'chai';
import RcPhone from '../../src/rc-phone';
import config from '../../config';
/* global describe it before */

describe('brand', () => {
  let phone;
  const prefix = 'rc';
  before(() => {
    phone = new RcPhone({
      sdkSettings: {
        ...config.sdk,
      },
      prefix,
      defaultBrand: {
        ...config.brand,
      },
    });
  });

  it('should have initial state based on brand setting', () => {
    expect(phone.defaultBrand.state).to.deep.equal({
      ...config.brand,
    });
  });
});
