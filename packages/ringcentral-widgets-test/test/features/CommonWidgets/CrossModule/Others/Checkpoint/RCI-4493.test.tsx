/**
 * RCI-4493: Calling/SMS from US to CA should not be considered as international in integration apps
 * https://test_id_domain/test-cases/RCI-4493
 * Preconditions:
 * CTI has been installed
 * Entry point(/s):
 *
  | Login account |Action type |Another account type |Number |Expected result |
  | RCUS |Make an outbound call |RCCA |6501234567 |The call should be placed |
	| RCCA |Send a message |RCUS |2507654321 |The message should be sent |

 */

import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  p1,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  And,
} from '@ringcentral-integration/test-utils';
import { StepProp } from '../../../../../lib/step';
import { CheckCallControlPage, MakeCall } from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock,
  MockExtensionInfo,
  MockNumberParserV2,
  MockPermission,
  MockGetPhoneNumber,
  MockPostSMS,
  MockMessageSync,
  MockPresence,
  MockAccountInfo,
  MockMessageList,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import { CheckCountryCodeField } from '../../../../../steps/Settings';
import { SendSMS, CheckConversationPage } from '../../../../../steps/Messages';

@autorun(test)
@it
@p1
@title(
  'Calling/SMS from US to CA should not be considered as international in integration apps',
)
@common
export class RCI4493 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | regionCode | regionName           | phoneNumber  | e164ParsedNumber | parsedNumber     | parsedCountry | textMessage    |
    | 'CA'       | '(+1) Canada'        | '2507654321' | '+12507654321'   | '(250) 765-4321' | 'US'          | 'test message' |
    | 'US'       | '(+1) United States' | '6501234567' | '+16501234567'   | '(650) 123-4567' | 'CA'          | 'test message' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Calling/SMS from US to CA should not be considered as international in integration apps"
        action={({ regionCode, e164ParsedNumber, textMessage }: any) => [
          CreateMock,
          <MockPermission
            handler={(features) => {
              const permission = features
                .filter(
                  (feature) =>
                    feature.id !== 'InternationalSMS' &&
                    feature.id !== 'InternationalCalling',
                )
                .concat([
                  {
                    id: 'InternationalSMS',
                    available: false,
                  },
                  {
                    id: 'InternationalCalling',
                    available: false,
                  },
                ]);
              return permission;
            }}
          />,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = regionCode;
              return mockData;
            }}
          />,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.serviceInfo.brand.homeCountry.isoCode = regionCode;
              return mockData;
            }}
          />,
          <MockPostSMS
            isDefaultInit
            handler={(mockData) => {
              mockData.to[0].phoneNumber = e164ParsedNumber;
              mockData.subject = textMessage;
              return mockData;
            }}
          />,
          <MockMessageSync repeat={0} />,
          <MockPresence repeat={0} />,
          <MockMessageList repeat={0} />,
          MockGetPhoneNumber,
        ]}
      >
        <Given desc="login App" action={Login} />
        <When
          desc="navigation to setting page"
          action={<NavigateTo path="/settings/region" />}
        />
        <Then
          desc="Check region country"
          action={async ({ regionName }: any) => (
            <CheckCountryCodeField countryCode={regionName} />
          )}
        />
        <When
          desc="Mock parse result"
          action={async ({ parsedCountry, e164ParsedNumber }: any) => (
            <MockNumberParserV2
              isDefaultInit={false}
              handler={(mockData) => {
                mockData.results[0].category = Category.Regular;
                // mock receiver country
                mockData.results[0].numberDetails.country.isoCode =
                  parsedCountry;
                mockData.results[0].formats[0] = {
                  ...mockData.results[0].formats[0],
                  e164Extended: e164ParsedNumber,
                };
                mockData.results = [mockData.results[0]];
                return mockData;
              }}
            />
          )}
        />
        <And
          desc="{regionCode} send message to {parsedCountry}"
          action={[<NavigateTo path="/composeText" />, SendSMS]}
        />
        <Then
          desc="Checked Contact on the message detail page is {parsedNumber}
										Can send the message successfully"
          action={async ({ parsedNumber }: any) => (
            <CheckConversationPage currentName={parsedNumber} />
          )}
        />
        <When
          desc="Mock parse result"
          action={async ({ parsedCountry, e164ParsedNumber }: any) => (
            <MockNumberParserV2
              isDefaultInit={false}
              handler={(mockData) => {
                mockData.results[0].category = Category.Regular;
                // mock receiver country
                mockData.results[0].numberDetails.country.isoCode =
                  parsedCountry;
                mockData.results[0].formats[0] = {
                  ...mockData.results[0].formats[0],
                  e164Extended: e164ParsedNumber,
                };
                return mockData;
              }}
            />
          )}
        />
        <And
          desc="{regionCode} make a call to {parsedCountry} number"
          action={[<NavigateTo path="/dialer" />, MakeCall]}
        />
        <Then
          desc="Checked the dialing number on call control page is{parsed number}
                      Checked Contact on the call control pageis{Contact}"
          action={CheckCallControlPage}
        />
      </Scenario>
    );
  }
}
