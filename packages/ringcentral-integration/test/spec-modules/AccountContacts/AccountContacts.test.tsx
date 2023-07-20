import type ContactResource from '@rc-ex/core/lib/definitions/ContactResource';
import {
  And,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { phoneTypes } from '../../../enums/phoneTypes';
import { AccountContacts } from '../../../modules/AccountContacts';
import type { CompanyContacts } from '../../../modules/CompanyContacts';
import { mockModuleGenerator } from '../../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    presences: {
      '3927794004': {
        presence: {
          dndStatus: 'TakeAllCalls',
          presenceStatus: 'Available',
          telephonyStatus: 'NoCall',
          userStatus: 'Available',
        },
        timestamp: Date.now(),
      },
      '3927803004': {
        presence: {
          dndStatus: 'TakeAllCalls',
          presenceStatus: 'Available',
          telephonyStatus: 'NoCall',
          userStatus: 'Available',
        },
        timestamp: 1000,
      },
      '3927807004': {
        presence: {
          dndStatus: 'TakeAllCalls',
          presenceStatus: 'Available',
          telephonyStatus: 'NoCall',
          userStatus: 'Available',
        },
        timestamp: 1000,
      },
    },
    profileImages: {
      '1': {
        imageUrl: 'http://foo',
        timestamp: Date.now(),
      },
      '2': {
        imageUrl: 'http://bar',
        timestamp: 1000,
      },
    },
  });

const rawContactsHaveMobileContactPhoneNumbers: ContactResource[] = [
  {
    id: '867284004',
    type: 'User',
    status: 'Enabled',
    firstName: 'Abdul',
    lastName: 'Bernhard',
    jobTitle: 'Sr. Developer',
    email: 'AbdulB@rcmtorcv.onmicrosoft.com',
    extensionNumber: '176',
    account: {
      id: '864984004',
    },
    phoneNumbers: [
      {
        phoneNumber: '+12077751826',
        type: 'VoiceFax',
        formattedPhoneNumber: '+1 (207) 7751826',
        usageType: 'DirectNumber',
        primary: true,
      },
      {
        phoneNumber: '+13015927271',
        formattedPhoneNumber: '+1 (301) 5927271',
        usageType: 'MobileNumber',
      },
      {
        phoneNumber: '+13015927272',
        formattedPhoneNumber: '+1 (301) 5927272',
        usageType: 'ContactNumber',
      },
    ],
  },
];

@autorun(test)
@title('Check fetch image Success in AccountContacts')
export class CheckFetchImageSuccess extends Step {
  run() {
    return (
      <Scenario desc="Check FetchImageSuccess">
        <Given
          desc="Create an AccountContacts instance"
          action={(_: any, context: any) => {
            context.instance = new AccountContacts({
              client: {} as any,
              extensionInfo: {} as any,
              companyContacts: {} as any,
              accountContactsOptions: {} as any,
            });
            expect(context.instance.profileImages).toEqual({});
          }}
        />
        <When
          desc="Call 'fetchImageSuccess' for changing 'profileImages'"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.fetchImageSuccess.call(context.mockModule, {
              imageId: '3',
              imageUrl: 'http://test',
              ttl: 100,
            });
          }}
        />
        <Then
          desc="check 'profileImages' should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.profileImages['1'].imageUrl).toBe(
              'http://foo',
            );
            expect(context.mockModule.profileImages['3'].imageUrl).toBe(
              'http://test',
            );
            expect(Object.keys(context.mockModule.profileImages).length).toBe(
              2,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check batch fetch presence success in AccountContacts')
export class CheckBatchFetchPresenceSuccess extends Step {
  run() {
    return (
      <Scenario desc="Check batchFetchPresenceSuccess">
        <Given
          desc="Create an AccountContacts instance"
          action={(_: any, context: any) => {
            context.instance = new AccountContacts({
              client: {} as any,
              extensionInfo: {} as any,
              companyContacts: {} as any,
              accountContactsOptions: {} as any,
            });
            expect(context.instance.presences).toEqual({});
          }}
        />
        <When
          desc="Call 'batchFetchPresenceSuccess' for changing 'presences'"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.batchFetchPresenceSuccess.call(
              context.mockModule,
              {
                presenceMap: {
                  '42': {
                    dndStatus: 'TakeAllCalls',
                    presenceStatus: 'Available',
                    telephonyStatus: 'NoCall',
                    userStatus: 'Available',
                  },
                },
                ttl: 100,
              },
            );
          }}
        />
        <Then
          desc="check 'presences' should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.presences['42'].presence).toEqual({
              dndStatus: 'TakeAllCalls',
              presenceStatus: 'Available',
              telephonyStatus: 'NoCall',
              userStatus: 'Available',
            });
            expect(Object.keys(context.mockModule.presences)).toEqual([
              '42',
              '3927794004',
            ]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check mobile and contact phone numbers are included in AccountContacts')
export class CheckMobileContactPhoneNumbersSuccess extends Step {
  run() {
    return (
      <Scenario desc="Check mobileContactPhoneNumbersSuccess">
        <Given desc="Create an AccountContacts instance" />
        <And
          desc="company contacts return contacts that has direct, mobile and contact phone numbers"
          action={(_: any, context: any) => {
            context.instance = mockModuleGenerator(
              new AccountContacts({
                client: {} as any,
                extensionInfo: {} as any,
                companyContacts: {
                  filteredContacts: rawContactsHaveMobileContactPhoneNumbers,
                } as CompanyContacts,
                accountContactsOptions: {} as any,
              }),
            );
          }}
        />
        <Then
          desc="check 'contacts[0]'.phoneNumbers should be as expected"
          action={(_: any, context: any) => {
            const phoneNumbers = context.instance.contacts[0]
              .phoneNumbers as AccountContacts['contacts'][0]['phoneNumbers'];

            // should have direct, and contact, mobile phone numbers
            const expectedPhoneTypes: string[] = [
              phoneTypes.direct,
              phoneTypes.contact,
              phoneTypes.mobile,
            ];

            expect(
              phoneNumbers.filter((phone) =>
                expectedPhoneTypes.includes(phone.phoneType),
              ),
            ).toEqual([
              {
                formattedPhoneNumber: '+1 (207) 7751826',
                phoneNumber: '+12077751826',
                phoneType: 'direct',
                primary: true,
                type: 'VoiceFax',
                usageType: 'DirectNumber',
              },
              {
                formattedPhoneNumber: '+1 (301) 5927271',
                phoneNumber: '+13015927271',
                phoneType: 'mobile',
                usageType: 'MobileNumber',
              },
              {
                formattedPhoneNumber: '+1 (301) 5927272',
                phoneNumber: '+13015927272',
                phoneType: 'contact',
                usageType: 'ContactNumber',
              },
            ]);
          }}
        />
      </Scenario>
    );
  }
}
