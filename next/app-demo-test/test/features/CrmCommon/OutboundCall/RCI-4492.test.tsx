/**
 * RCI-4492: Outbound call - from ${BrandName} App(Jupiter)
 * https://test_it_domain/test-cases/RCI-4492
 * Preconditions:
 * User is logged-in to 3rd party
 * CTI app is integrated,
 * The user has logged in CTI app
 * User has installed {BrandNameApp}
 * Entry point(/s):
 *
  | Brand |Jupiter app name |Link |
  | RC |'RingCentral App' |'rcapp://r/call?number={phoneNumber}' |
	| AT&T |'AT&T Office@Hand App' |'officeathand://r/call?number=<phone number>' |
	| BT |'BT Cloud Work App' |'com.bt.cloudwork.app://r/call?number=<phone number>' |
	| Telus |'TELUS Business Connect™ App' |'rctelus://r/call?number=<phone number>' |
	| Atos |'Unify Office App' |'unifyoffice://r/call?number=<phone number>' |

 * Settings > Calling > Make my calls with > {Jupiter app name}
 */
import {
  And,
  autorun,
  common,
  examples,
  Given,
  it,
  p0,
  Scenario,
  Step,
  StepProp,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CloseAlertMessage } from '../../../steps/Alert';
import {
  CheckCallWithJupiterLink,
  MakeOutboundCall,
} from '../../../steps/Call';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import { WaitBrandConfigReady } from '../../../steps/IDB';
import {
  CreateMock,
  generateCallLogData,
  MockAccountInfo,
  MockCallLogs,
  MockCallLogSync,
  MockGetPhoneNumber,
  MockMessageSync,
  MockNumberParserV2,
} from '../../../steps/Mock';
import { NavigateToDialer } from '../../../steps/Navigate';
import { NavigateTo } from '../../../steps/Router';
import {
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../steps/Settings';

beforeEach(() => {
  window.open = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

const brandData = [
  {
    brand: 'rc',
    brandId: '1210',
    brandName: 'RingCentral app',
    link: /rcapp:\/\/r\/call\?number=.+/,
    universalLink: /https:\/\/app.ringcentral.com\/r\/call\?number=.+/,
  },
  // TODO: this is internal brand, need move to internal test
  // {
  //   brand: 'atos',
  //   brandId: '2020',
  //   brandName: 'Unify Office App',
  //   link: /unifyoffice:\/\/r\/call\?number=.+/,
  //   universalLink: /https:\/\/app.unifyoffice.com\/r\/call\?number=.+/,
  // },
];

const phoneNumberData = [
  {
    areaCode: '650',
    type: 'localNumber',
    phoneNumber: '1234567',
  },
  {
    type: 'companyWithExt',
    phoneNumber: '+16501234567*102',
  },
  {
    type: 'international',
    phoneNumber: '+441234567890',
  },
  {
    type: 'did',
    phoneNumber: '6501234567',
  },
  {
    type: 'dl',
    phoneNumber: '6501234567',
  },
  {
    type: 'ext',
    phoneNumber: '102',
  },
];

const exampleData: typeof brandData & typeof phoneNumberData = [];
brandData.forEach((item, index) => {
  if (index === 0) {
    exampleData.push({ ...item, ...phoneNumberData[index] });
  }
  exampleData.push({ ...item, ...phoneNumberData[index + 1] });
});

@autorun(test)
@it
@p0
@common
@title('Outbound call - from {brand} App(Jupiter)')
export class RCI4492 extends Step {
  Login: StepProp = () => (
    <CommonLogin CreateInstance={CreateInstance} brand={this.example.brand} />
  );
  CreateMock: StepProp = CreateMock;
  GoToCallingSetting: StepProp = () => <NavigateTo path="/settings/calling" />;
  @examples(exampleData)
  run() {
    const { Login, CreateMock, GoToCallingSetting } = this;

    return (
      <Scenario
        desc={`Outbound call - from ${this.example.brand} App(Jupiter)`}
      >
        <Given
          desc="Login app"
          action={[
            CreateMock,
            MockGetPhoneNumber,
            MockMessageSync,
            MockCallLogs,
            <MockAccountInfo
              handler={(mockData) => {
                mockData.serviceInfo.brand.id = this.example.brandId;
                return mockData;
              }}
            />,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                direction: 'Outbound',
                toNumber: this.example.phoneNumber,
              })}
            />,
            Login,
            <WaitBrandConfigReady brandId={this.example.brandId} />,
          ]}
        />
        <And
          desc="Settings > Calling > Make my calls with > {jupiterName}"
          action={({ brandName }: { brandName: string }) => [
            <MockNumberParserV2
              isDefaultInit={false}
              repeat={0}
              handler={(mockData) => {
                mockData.results[0].formats[0] = {
                  ...mockData.results[0].formats[0],
                  e164Extended: this.context.example.phoneNumber,
                };
                return mockData;
              }}
            />,
            GoToCallingSetting,
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName={brandName} />,
            ClickSaveButton,
            <CloseAlertMessage message="Settings saved successfully." />,
          ]}
        />
        <When
          desc="Direct to Phone page, check the dial page, fill the following {phone number} type in 'To' field, click the call button
                  Local number: 1234567
                  International number: +441234567890
                  Ext: 102
                  DID: 6501234567
                  Digital line number: 6501234567
                  Company number * Ext: +16501234567 * 102"
          action={[NavigateToDialer, MakeOutboundCall]}
        />
        <Then
          desc="Open URL with {link}
                  Note:
                  For other brands, use the RC brand's link"
          action={CheckCallWithJupiterLink}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@it
@p0
@common
@title('Outbound call with Jupiter App - normalize universal link')
export class RCI4492UniversalLink extends Step {
  Login: StepProp = () => {
    return (
      <CommonLogin CreateInstance={CreateInstance} brand={this.example.brand} />
    );
  };
  CreateMock: StepProp = CreateMock;
  GoToCallingSetting: StepProp = () => <NavigateTo path="/settings/calling" />;
  @examples([exampleData[0]])
  run() {
    const { Login, CreateMock, GoToCallingSetting } = this;
    return (
      <Scenario
        desc={`Outbound call - from ${this.example.brand} App(Jupiter)`}
      >
        <Given
          desc="Login app"
          action={[
            CreateMock,
            MockGetPhoneNumber,
            MockMessageSync,
            MockCallLogs,
            <MockAccountInfo
              handler={(mockData) => {
                mockData.serviceInfo.brand.id = this.example.brandId;
                return mockData;
              }}
            />,
            <MockCallLogSync
              mockResponse={generateCallLogData({
                direction: 'Outbound',
                toNumber: this.example.phoneNumber,
              })}
            />,
            Login,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (_: unknown, ctx: any) => {
              const originalBrandConfig = ctx.app.modules.Brand.brandConfig;
              app.modules.Brand.setDynamicConfig({
                ...originalBrandConfig,
                allowJupiterUniversalLink: true,
                callWithJupiter: {
                  ...originalBrandConfig.callWithJupiter,
                  // make sure the link has no trailing slash similar to BSS' appMainDomain property
                  link: 'https://app.ringcentral.com',
                },
              });
            },
          ]}
        />
        <And
          desc="Settings > Calling > Make my calls with > {jupiterName}"
          action={({ brandName }: { brandName: string }) => [
            <MockNumberParserV2
              isDefaultInit={false}
              repeat={0}
              handler={(mockData) => {
                mockData.results[0].formats[0] = {
                  ...mockData.results[0].formats[0],
                  e164Extended: this.context.example.phoneNumber,
                };
                return mockData;
              }}
            />,
            GoToCallingSetting,
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName={brandName} />,
            ClickSaveButton,
            <CloseAlertMessage message="Settings saved successfully." />,
          ]}
        />
        <When
          desc="Direct to Phone page, check the dial page, fill the following {phone number} type in 'To' field, click the call button
                  Local number: 1234567
                  International number: +441234567890
                  Ext: 102
                  DID: 6501234567
                  Digital line number: 6501234567
                  Company number * Ext: +16501234567 * 102"
          action={[NavigateToDialer, MakeOutboundCall]}
        />
        <Then
          desc="Open URL with {link}
                  Note:
                  For other brands, use the RC brand's link"
          action={CheckCallWithJupiterLink}
        />
      </Scenario>
    );
  }
}
