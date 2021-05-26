import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';

import { AccountContacts } from '../../../modules/AccountContactsV2';
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
