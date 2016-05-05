import { expect } from 'chai';
import config from '../config';

import RcPhone from '../src/rc-phone';

/* global describe it before */

describe('User Test Suite', async () => {
  let phone;
  let sdk;
  let extensionInfo;
  let extensionPhoneNumbers;
  before(async () => {
    phone = new RcPhone({
      sdkSettings: {
        ...config.sdk,
      },
      brandSettings: {
        ...config.brand,
      },
    });
    sdk = phone.sdk;
    await phone.auth.login({ ...config.user });

    // Get standard data from server
    extensionInfo = (await sdk.platform().get('/account/~/extension/~')).json();
    const resp = (await sdk.platform().get('/account/~/extension/~/phone-number')).json();
    extensionPhoneNumbers = resp.records;
  });

  it('Load User Info', async () => {
    await phone.user.loadUserInfo();
  });

  it('Get User Basic Info', async () => {
    const basicInfo = phone.user.basicInfo;
    expect(basicInfo.id).to.equal(extensionInfo.id);
    expect(basicInfo.firstName).to.equal(extensionInfo.contact.firstName);
    expect(basicInfo.lastName).to.equal(extensionInfo.contact.lastName);
    expect(basicInfo.displayName).to.equal(extensionInfo.name);
    expect(basicInfo.email).to.equal(extensionInfo.contact.email);
    expect(basicInfo.avatar).to.equal(extensionInfo.profileImage.uri);
    expect(basicInfo.extension).to.equal(extensionInfo.extensionNumber);
    expect(basicInfo.mainCompanyNumber).to.equal(
      (extensionPhoneNumbers.find(number => number.usageType === 'MainCompanyNumber')).phoneNumber);
  });

  it('Get User Direct Numbers', async () => {
    const extensionDirectNumbers = extensionPhoneNumbers
      .filter(number => number.usageType === 'DirectNumber');
    const directNumbers = phone.user.getPhoneNumbersByType('DirectNumber');
    expect(directNumbers.length).to.equal(extensionDirectNumbers.length);
    extensionDirectNumbers.forEach(number => {
      const result = directNumbers.find(n => n.phoneNumber === number.phoneNumber);
      expect(result).to.not.equal(undefined);
    });
  });

  it('Get User Company Numbers', async () => {
    const extensionCompanyNumbers = extensionPhoneNumbers
      .filter(number => number.usageType === 'CompanyNumber');
    const companyNumbers = phone.user.getPhoneNumbersByType('CompanyNumber');
    expect(companyNumbers.length).to.equal(extensionCompanyNumbers.length);
    extensionCompanyNumbers.forEach(number => {
      const result = companyNumbers.find(n => n.phoneNumber === number.phoneNumber);
      console.log(result.phoneNumber);
      expect(result).to.not.equal(undefined);
    });
  });

  it('Get User Phone Numbers for Outbound Calling', async () => {
    const extensionOutboundCallerNumbers = extensionPhoneNumbers
      .filter(number => number.features.indexOf('CallerId') > -1
      );
    const outboundCallerNumbers = phone.user.getPhoneNumbersByFeatures(['CallerId']);
    expect(outboundCallerNumbers.length).to.equal(extensionOutboundCallerNumbers.length);
    extensionOutboundCallerNumbers.forEach(number => {
      const result = outboundCallerNumbers.find(n => n.phoneNumber === number.phoneNumber);
      expect(result).to.not.equal(undefined);
    });
  });

  it('Get User Phone Numbers for SMS Sending', async () => {
    const extensionSmsSendingNumbers = extensionPhoneNumbers
      .filter(number => number.features.indexOf('SmsSender') > -1);
    const smsSendingNumbers = phone.user.getPhoneNumbersByFeatures(['SmsSender']);
    expect(smsSendingNumbers.length).to.equal(extensionSmsSendingNumbers.length);
    extensionSmsSendingNumbers.forEach(number => {
      const result = smsSendingNumbers.find(n => n.phoneNumber === number.phoneNumber);
      expect(result).to.not.equal(undefined);
    });
  });
});

