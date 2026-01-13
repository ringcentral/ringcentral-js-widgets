/**
 * RCI-3389: Outbound call - from ${BrandName} App(Jupiter)
 * https://test_it_domain/test-cases/RCI-3389
 * Preconditions:
 * User is logged-in into 3rd party
 * CTI app is integrated,
 * The user has logged in CTI app
 * User has installed {BrandNameApp}
 * RC: 'RingCentral App'
 * AT&T: 'AT&T Office@Hand'
 * BT:BT Cloud Work App
 * TELUS: TELUS Business Connect™ App
 * Avaya: Avaya Cloud APP
 * Entry point(/s):
 *
  | Brand |Brand Name |Link |
  | RC |'RingCentral App' |'rcapp://r/call?number={phoneNumber}' |
	| AT&T |'AT&T Office@Hand App' |'https://app.officeathand.att.com/r/call?number={phoneNumber}' |
	| BT |'BT Cloud Work App' |'https://app.cloudwork.bt.com/r/call?number={phoneNumber}' |
	| Telus |'Business Connect App' |'https://app.businessconnect.telus.com/r/call?number={phoneNumber}' |
	| Avaya |'Avaya Cloud Office' |'https://app.cloudoffice.avaya.com/r/call?number={phoneNumber}' |

 * Settings > Calling > Make my calls with > {BrandName App }
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  common,
  examples,
  it,
  p0,
  title,
} from '@ringcentral-integration/test-utils';

import {
  CheckCallWithJupiterLink,
  MakeOutboundCall,
} from '../../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockGetPhoneNumber,
  MockNumberParserV2,
} from '../../../../../../../steps/Mock';
import { NavigateToDialer } from '../../../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../../../steps/Router';
import {
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../../../../../steps/Settings';

const brandData = [
  {
    brand: 'rc',
    brandName: 'RingCentral app',
    link: /rcapp:\/\/r\/call\?number=.+/,
  },
  {
    brand: 'att',
    brandName: 'AT&T Office@Hand app',
    link: /https:\/\/app\.officeathand\.att\.com\/r\/call\?number=.+/,
  },
  {
    brand: 'bt',
    brandName: 'BT Cloud Work app',
    link: /https:\/\/app\.cloudwork\.bt\.com\/r\/call\?number=.+/,
  },
  {
    brand: 'telus',
    brandName: 'TELUS Business Connect™ app',
    link: /https:\/\/app\.businessconnect\.telus\.com\/r\/call\?number=.+/,
  },
  {
    brand: 'avaya',
    brandName: 'Avaya Cloud Office app',
    link: /https:\/\/app\.cloudoffice\.avaya\.com\/r\/call\?number=.+/,
  },
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

beforeEach(() => {
  window.open = jest.fn();
  if (window.navigator.userAgent) {
    // keep the same as the original user agent in different environments
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'unknown',
      configurable: true,
    });
  }
});

@autorun(test)
@common
@it
@p0
@title('Outbound call - from ${brandName} (Jupiter)')
export class RCI3389 extends Step {
  Login: StepFunction<any, any> | StepFunction<any, any>[] = (props) => {
    this.context.example = {
      ...this.context.example,
      brandName: 'RingCentral app',
      link: /https:\/\/app\.ringcentral\.com\/r\/call\?number=.+/,
    };
    return <CommonLogin CreateInstance={CreateInstance} />;
  };
  CreateMock: StepFunction<any, any> | StepFunction<any, any>[] | null =
    CreateMock;
  @examples(exampleData)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Outbound call - call ${phoneNumber} from ${brandName} App(Jupiter)"
        action={[CreateMock, MockGetPhoneNumber]}
      >
        <Given desc="Login app" action={Login} />
        <When
          desc="Direct to Phone page, check the dial page, fill the following {phone number} type in 'To' field
                  Local number
                  International number
                  Ext
                  DID
                  Digital line number
                  Company number * Ext"
          action={({ brandName }: any, { phone }: any) => {
            jest.spyOn(phone.softphone, 'makeCall');
            return [
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
              <NavigateTo path="/settings/calling" />,
              ExpandCallingSettingDropdown,
              <SelectCallingSetting settingName={brandName} />,
              ClickSaveButton,
            ];
          }}
        />
        <And
          desc="click the call button"
          action={[NavigateToDialer, MakeOutboundCall]}
        />
        <Then
          desc="Open URL with {Link}Note:Outlook RC plugin would open the RC Jupiter directly"
          action={CheckCallWithJupiterLink}
        />
      </Scenario>
    );
  }
}
