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
	| Telus |'TELUS Business Connect App' |'rctelus://r/call?number=<phone number>' |
	| Atos |'Unify Office App' |'unifyoffice://r/call?number=<phone number>' |
	| Rainbow |'Rainbow Office App' |'com.rainbowoffice.app://r/call?number=<phone number>' |
	| Vodafone |'Vodafone Business with RingCentral' |'com.ringcentral.vodafonebusiness.app://r/call?number=<phone number>' |

 * Settings > Calling > Make my calls with > {Jupiter app name}
 */
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
import {
  p0,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepProp,
  And,
  common,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

import { CloseAlertMessage } from '../../../steps/Alert';
import {
  CheckCallWithJupiterLink,
  MakeOutboundCall,
} from '../../../steps/Call';
import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import {
  CreateMock,
  MockNumberParserV2,
  MockGetPhoneNumber,
  MockMessageSync,
  MockCallLogs,
  MockCallLogSync,
  generateCallLogData,
  MockAccountInfo,
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
    brandName: 'RingCentral App',
    link: /rcapp:\/\/r\/call\?number=.+/,
  },
  {
    brand: 'att',
    brandId: '3420',
    brandName: 'AT&T Office@Hand App',
    link: /officeathand:\/\/r\/call\?number=.+/,
  },
  {
    brand: 'bt',
    brandId: '7710',
    brandName: 'BT Cloud Work App',
    link: /com.bt.cloudwork.app:\/\/r\/call\?number=.+/,
  },
  {
    brand: 'telus',
    brandId: '7310',
    brandName: 'TELUS Business Connect App',
    link: /rctelus:\/\/r\/call\?number=.+/,
  },
  {
    brand: 'atos',
    brandId: '2020',
    brandName: 'Unify Office App',
    link: /unifyoffice:\/\/r\/call\?number=.+/,
  },
];

export const phoneNumberData = [
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
@title('Outbound call - from {BrandName} App(Jupiter)')
export class RCI4492 extends Step {
  Login: StepProp = () => {
    this.context.example = {
      ...this.context.example,
      brandName: 'RingCentral App',
      link: /https:\/\/app\.ringcentral\.com\/r\/call\?number=.+/,
    };
    return <CommonLogin CreateInstance={CreateInstance} />;
  };
  CreateMock: StepProp = CreateMock;
  MakeOutboundCall: StepProp = MakeOutboundCall;
  GoToCallingSetting: StepProp = () => <NavigateTo path="/settings/calling" />;
  @examples(exampleData)
  run() {
    const { Login, CreateMock, MakeOutboundCall, GoToCallingSetting } = this;
    return (
      <Scenario
        desc="Outbound call - from {BrandName} App(Jupiter)"
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
        ]}
      >
        <Given desc="Login app" action={Login} />
        <And
          desc="Settings > Calling > Make my calls with > {jupiterName}"
          action={[
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
            (({ brandName }: { brandName: string }, { phone }) => {
              if (phone?.callingSettings?.callWith === callingOptions.jupiter) {
                return [];
              }
              return [
                GoToCallingSetting,
                ExpandCallingSettingDropdown,
                <SelectCallingSetting settingName={brandName} />,
                ClickSaveButton,
                <CloseAlertMessage message="Settings saved successfully." />,
              ];
            }) as StepFunction,
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
@title('Outbound call - from {BrandName} App(Jupiter)')
export class RCI4492UniversalLink extends Step {
  Login: StepProp = () => {
    this.context.example = {
      ...this.context.example,
      brandName: 'RingCentral App',
      link: /https:\/\/app\.ringcentral\.com\/r\/call\?number=.+/,
    };
    return <CommonLogin CreateInstance={CreateInstance} />;
  };
  CreateMock: StepProp = CreateMock;
  GoToCallingSetting: StepProp = () => <NavigateTo path="/settings/calling" />;
  IDBCallWithJupiterLink: string = 'https://app.ringcentral.com';
  CheckCallWithJupiter: StepProp = CheckCallWithJupiterLink;
  MakeOutboundCall: StepProp = MakeOutboundCall;
  @examples([exampleData[0]])
  run() {
    const {
      Login,
      CreateMock,
      MakeOutboundCall,
      GoToCallingSetting,
      IDBCallWithJupiterLink,
      CheckCallWithJupiter,
    } = this;
    return (
      <Scenario
        desc="Outbound call - from {BrandName} App(Jupiter)"
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
        ]}
      >
        <Given desc="Login app" action={Login} />
        <And
          desc="Settings > Calling > Make my calls with > {jupiterName}"
          action={[
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (_: unknown, { phone }: any) => {
              const originalBrandConfig = phone.brand.brandConfig;
              phone.brand.setDynamicConfig({
                ...originalBrandConfig,
                allowJupiterUniversalLink: true,
                callWithJupiter: {
                  ...originalBrandConfig.callWithJupiter,
                  // make sure the link has no trailing slash similar to BSS' appMainDomain property
                  link: IDBCallWithJupiterLink,
                },
              });
            },
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
            (({ brandName }: { brandName: string }, { phone }) => {
              if (phone?.callingSettings?.callWith === callingOptions.jupiter) {
                return [];
              }
              return [
                GoToCallingSetting,
                ExpandCallingSettingDropdown,
                <SelectCallingSetting settingName={brandName} />,
                ClickSaveButton,
                <CloseAlertMessage message="Settings saved successfully." />,
              ];
            }) as StepFunction,
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
          action={CheckCallWithJupiter}
        />
      </Scenario>
    );
  }
}
