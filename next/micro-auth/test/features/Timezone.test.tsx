import {
  createSharedApp,
  Initiator,
  injectable,
  RcViewModule,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Client } from '../../src/app/services/Client';
import { ExtensionInfo } from '../../src/app/services/ExtensionInfo';
import { Timezone } from '../../src/app/services/Timezone/Timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const defaultTimezone = {
  uri: '',
  id: '1',
  name: 'GMT',
  description: 'Casablanca, Monrovia, Reykjavik',
  bias: '0',
};

const beijingTimezone = {
  uri: 'https://api-xmrupxmn.rclab_domain/restapi/v1.0/dictionary/timezone/26',
  id: '26',
  name: 'Asia/Shanghai',
  description: 'Beijing, Chongqing, Hong Kong, Urumqi',
  bias: '480',
};

const fijiTimezone = {
  uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/timezone/42',
  id: '42',
  name: 'Pacific/Fiji',
  description: 'Fiji, Marshall Is.',
  bias: '720',
};

const noMatchTimezone = {
  uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/timezone/42',
  id: '123',
  name: 'Coordinated Universal',
  description: 'Coordinated Universal',
  bias: '-11',
};

const timezoneList = [defaultTimezone, beijingTimezone, fijiTimezone];
@injectable({
  name: 'MockView',
})
class MockView extends RcViewModule {
  constructor() {
    super();
  }

  component() {
    return null;
  }
}

@autorun(test)
@title('Timezone: getUserTimezone')
class CleanOnReset extends Step {
  @examples([
    // Set timezone of PC which mapped with RC timezone list
    {
      scenario: 'Set timezone of PC which mapped with RC timezone list',
      timezoneList,
      pcTimezone: beijingTimezone,
      accountTimezone: beijingTimezone,
      expectedTimezone: beijingTimezone,
    },
    // Set timezone of PC which mapped with RC timezone list
    {
      scenario: 'Set timezone of PC which mapped with RC timezone list',
      timezoneList,
      pcTimezone: fijiTimezone,
      accountTimezone: beijingTimezone,
      expectedTimezone: fijiTimezone,
    },
    // Set timezone of PC which doesn't mapped with RC timezone list
    // Account timezone mapped with RC timezone list
    {
      scenario: "Set timezone of PC which doesn't mapped with RC timezone list",
      timezoneList,
      pcTimezone: noMatchTimezone,
      accountTimezone: beijingTimezone,
      expectedTimezone: beijingTimezone,
    },
    // Can't be matched with timezone of PC nor RC timezone list
    {
      scenario: "Can't be matched with timezone of PC nor RC timezone list",
      timezoneList,
      pcTimezone: noMatchTimezone,
      accountTimezone: noMatchTimezone,
      expectedTimezone: defaultTimezone,
    },
    // Error Scenario
    {
      scenario: 'Failed to get correct timezone',
      timezoneList: timezoneList.map(({ id, ...item }) => item),
      pcTimezone: beijingTimezone,
      accountTimezone: beijingTimezone,
      expectedTimezone: defaultTimezone,
    },
  ])
  async run() {
    const { timezoneList, pcTimezone, accountTimezone, expectedTimezone } =
      this.example;

    // Mock dayjs.tz.guess to return the PC timezone name
    jest.spyOn(dayjs.tz, 'guess').mockReturnValue(pcTimezone.name || '');

    const app = await createSharedApp({
      modules: [
        {
          provide: Client,
          useValue: {
            dictionary: () => ({
              timezone: () => ({
                list: () => Promise.resolve({ records: timezoneList }),
              }),
            }),
          },
        },
        {
          provide: ExtensionInfo,
          useValue: {
            data: {
              regionalSettings: {
                timezone: accountTimezone,
              },
            },
          },
        },
        Timezone,
      ],
      main: MockView,
      render: () => {
        return null;
      },
      share: {
        type: 'Base',
        name: 'internal-test',
      },
    });

    global.app = app;

    return (
      <Scenario desc="Timezone: getUserTimezone">
        <When
          desc="Generate Timezone module"
          action={async () => {
            await app.bootstrap();
          }}
        />
        <Then
          desc="Check getUserTimezone value"
          action={[
            async () => {
              const timezone = app.container.get(Timezone);

              const result = timezone.getUserTimezone();
              expect(result).toEqual(expectedTimezone);
            },
          ]}
        />
      </Scenario>
    );
  }
}
