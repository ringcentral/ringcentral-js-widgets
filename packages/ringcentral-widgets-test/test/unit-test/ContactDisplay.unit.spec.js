import React from 'react';
import renderer from 'react-test-renderer';
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { phoneSources } from '@ringcentral-integration/commons/enums/phoneSources';
import ContactDisplay from '@ringcentral-integration/widgets/components/ContactDisplay';

const DEFAULT_PROPS = {
  currentLocale: 'en-US',
  isLogging: false,
  disabled: false,
  countryCode: 'CA',
  selected: 0,
  areaCode: '',
  phoneNumber: '(209) 231-2939',
  fallBackName: 'fallBackName',
  brand: 'RingCentral',
};

const setup = (props) =>
  renderer.create(<ContactDisplay {...DEFAULT_PROPS} {...props} />).toJSON();

// TODO: properly test the criteria instead of relying on snapshot

describe('<jira id>: RCINT-8557:', () => {
  it.skip(`
    When contactMatches' length equals to 0 and prop enableContactFallback is true
    Then ContactDisplay display its props - fallBackName
  `, () => {
    const wrapper = setup({
      enableContactFallback: true,
      contactMatches: [],
    });
    // expect(wrapper).toMatchSnapshot();
  });
});

describe('<jira id>: RCINT-8557:', () => {
  it.skip(`
    When contactMatches' length equals to 0 and prop enableContactFallback is false
    Then ContactDisplay display its phone number
  `, () => {
    const wrapper = setup({
      enableContactFallback: false,
      contactMatches: [],
    });
    // expect(wrapper).toMatchSnapshot();
  });
});

describe('<jira id>: RCINT-8557:', () => {
  it.skip(`
    When contactMatches' length equals to 0 and prop enableContactFallback is false and phone number is undefined
    Then ContactDisplay display string 'Anonymous'
  `, () => {
    const wrapper = setup({
      enableContactFallback: false,
      phoneNumber: undefined,
      contactMatches: [],
    });
    // expect(wrapper).toMatchSnapshot();
  });
});

describe('<jira id>: RCINT-8557:', () => {
  it.skip(`
    When contactMatches' length equals to 1
    Then ContactDisplay display its phone number
  `, () => {
    const wrapper = setup({
      contactMatches: [
        {
          type: 'company',
          id: '160746006',
          firstName: 'Something1',
          lastName: 'New1',
          emails: ['mm1+1528852409478-2528424@dins.ru'],
          extensionNumber: '101',
          hasProfileImage: false,
          phoneNumbers: [
            { phoneNumber: '101', phoneType: phoneTypes.extension },
            { phoneNumber: '+12069853329', phoneType: phoneTypes.directPhone },
            { phoneNumber: '+13103223278', phoneType: phoneTypes.directPhone },
          ],
          presence: {
            dndStatus: 'TakeAllCalls',
            presenceStatus: 'Available',
            telephonyStatus: 'NoCall',
            userStatus: 'Available',
          },
          contactStatus: 'Enabled',
          name: 'Something1 New1',
          entityType: phoneSources.rcContact,
        },
      ],
    });
    // expect(wrapper).toMatchSnapshot();
  });
});

describe('<jira id>: RCINT-8557:', () => {
  it.skip(`
    When contactMatches' length greater than 1
    Then ContactDisplay display its phone number
  `, () => {
    const wrapper = setup({
      contactMatches: [
        {
          type: 'company',
          id: '208594004',
          firstName: 'Something1',
          lastName: 'New1',
          emails: ['email@email.com'],
          extensionNumber: '101',
          hasProfileImage: false,
          phoneNumbers: [
            { phoneNumber: '101', phoneType: phoneTypes.extension },
            { phoneNumber: '+18559100010', phoneType: phoneTypes.directPhone },
          ],
          contactStatus: 'Enabled',
          name: 'Something1 New1',
          entityType: phoneSources.rcContact,
        },
        {
          type: 'company',
          id: '208594005',
          firstName: 'Something2',
          lastName: 'New2',
          emails: ['email1@email.com'],
          extensionNumber: '101',
          hasProfileImage: false,
          phoneNumbers: [
            { phoneNumber: '101', phoneType: phoneTypes.extension },
            { phoneNumber: '+18559100010', phoneType: phoneTypes.directPhone },
          ],
          contactStatus: 'Enabled',
          name: 'Something2 New2',
          entityType: phoneSources.rcContact,
        },
      ],
    });
    // expect(wrapper).toMatchSnapshot();
  });
});
