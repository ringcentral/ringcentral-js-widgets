/**
 * RCI-445: Local number formatting
 * https://test_it_domain/test-cases/RCI-445
 * Preconditions:
 * <ol><li style='margin: 0px; padding: 0px;'>User is logged-in into 3rd party</li><li style='margin: 0px; padding: 0px;'>User has logged into CTI App with the account which has multiple dialing plans as below</li></ol><table class='table table-bordered'><tbody><tr><td><span style='font-weight: bold;'>Set DL(Dialing plans) in SW</span></td><td><span style='font-weight: bold;'>Country</span></td></tr><tr><td>US</td><td>US</td></tr><tr><td>CA</td><td>CA</td></tr></tbody></table><p style='margin: 0px; padding: 0px;'><i style='background-color: transparent;'><span style='font-weight: bolder;'>Note(/s)</span>: </i><span style='background-color: transparent;'>For Salesforce 6.0, user has logged into CTI app and set his locale to US/CA in Salesforce</span></p><p><strong><span style='color:#669966'><br></span></strong></p><p><strong><span style='color:#669966'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p><p>> Go to the 'Setting'</p><p>> Click 'Region' option</p>
 */
import { waitForRenderReady } from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../interfaces';
import type { StepFunction } from '../../../../../lib/step';
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
  p2,
  title,
} from '../../../../../lib/step';
import { Login as CommonLogin } from '../../../../../steps/Login';
import { SendSMS } from '../../../../../steps/Messages';
import {
  CreateMock as CommonCreateMock,
  MockDialingPlan,
  MockGetPhoneNumber,
  MockMessageSync,
  MockNumberParserV2,
} from '../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToRegionSettings,
  NavigateToSettings,
} from '../../../../../steps/Navigate';
import { SetAreaCode, SetCountryCode } from '../../../../../steps/Settings';

import numberParserV2_AU_1014037 from './mockData/numberParserV2_AU_1014037.json';
import numberParserV2_UK_79121016 from './mockData/numberParserV2_UK_79121016.json';

const dialingPlansData = {
  records: [
    {
      uri: 'https://api-rcapps-labs_domain/restapi/v1.0/dictionary/country/15',
      id: '15',
      name: 'Australia',
      isoCode: 'AU',
      callingCode: '61',
    },
    {
      uri: 'https://api-rcapps-labs_domain/restapi/v1.0/dictionary/country/160',
      id: '160',
      name: 'New Zealand',
      isoCode: 'NZ',
      callingCode: '64',
    },
    {
      uri: 'https://api-rcapps-labs_domain/restapi/v1.0/dictionary/country/224',
      id: '224',
      name: 'United Kingdom',
      isoCode: 'GB',
      callingCode: '44',
    },
  ],
};

interface ExampleItem {
  countryCode: string;
  countryName: string;
  countryCallingCode: string;
  areaCode: string;
  phoneNumber: string;
}

@autorun(test)
@common
@it
@p2
@title('Local number formatting')
export class LocalNumberFormatting extends Step {
  CreateMock?: StepFunction<any, any>;
  Login?: StepFunction<any, any>;

  @examples(`
    | countryCode | countryName      | countryCallingCode | areaCode | phoneNumber |
    | 'UK'        | 'United Kingdom' | '44'               | '8'      | '79121016'  |
    | 'AU'        | 'Australia'      | '61'               | '117'    | '1014037'   |
  `)
  run() {
    const {
      CreateMock = CommonCreateMock,
      Login = <CommonLogin skipCreateMock />,
    } = this;
    return (
      <Scenario desc="Local number formatting" action={CreateMock}>
        <Given
          desc="Mock data"
          action={({ countryCode }: ExampleItem) => [
            <MockGetPhoneNumber />,
            <MockMessageSync />,
            <MockNumberParserV2
              handler={(mockData) => {
                if (countryCode == 'AU') {
                  return numberParserV2_AU_1014037;
                }
                if (countryCode === 'UK') {
                  return numberParserV2_UK_79121016;
                }
                return mockData;
              }}
            />,
            <MockDialingPlan handler={() => dialingPlansData.records} />,
          ]}
        />
        <And desc="User is logged-in" action={Login} />
        <When
          desc="Go to entry points, set {Country} and enter area code, save
 Note(/s):For Salesforce 6.0, set{Country}in Salesforce, and enter area code in Region setting page in RC CTI APP."
          action={({
            areaCode,
            countryCallingCode,
            countryName,
          }: ExampleItem) => [
            NavigateToSettings,
            NavigateToRegionSettings,
            <SetCountryCode
              countryCallingCode={countryCallingCode}
              countryName={countryName}
            />,
            <SetAreaCode areaCode={areaCode} />,
          ]}
        />
        <And
          desc="> Go to Compose Text, > Enter the following type of {Numbers}
   > Fill text 'Test sms'
   > Click 'Send'
   Note(/s):
   7 digit local number, e.g4091529
   local numebr, e.g6504091529"
          action={({ phoneNumber }: ExampleItem) => [
            NavigateToComposeText,
            <SendSMS phoneNumber={phoneNumber} />,
          ]}
        />
        <Then
          desc="Message is sent."
          action={async (_: ExampleItem, { rcMock }: Context) => {
            await waitForRenderReady();
            expect(
              rcMock.fetchMock.called(
                'express:/restapi/v1.0/account/~/extension/~/sms',
              ),
            ).toBeTruthy();
          }}
        />
      </Scenario>
    );
  }
}
