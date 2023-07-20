/**
 * RCI-4389: Can call PSTN when can't match ext. but valid PSTN (DT<=MEL)
 * https://test_it_domain/test-cases/RCI-4389
 * Preconditions:
 * CTI app is integrated,
 * User is logged-in to 3rd party
 * The user has logged in to the CTI app
 * Set 'Smart Dial Plan Routing' to enable inSCP
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * User is not RC-US/RC-PR
 * Note:
 * DT=Dialing text
 * MEL=MaxExtensionLength
 * SCP(https://scp-xmnup.rc-lab-mock-domain.com/) > Accounts > Active Accounts>[phone number]>Account>Features & Settings
 * Entry point(/s):
 * Open CTI >Go to Settings page >Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut> Set region country same with account country/ Navigate to dial page
 * Note:
 * Only choose one of entry points to execute
 * Entry point(/s):
 * Open CTI >Go to Settings page >Set Calling setting with Browser/{Brandname} App/{Brandname} Phone/RingOut> Set region country same with account country/ Navigate to dial page
 * Note:
 * Only choose one of entry points to execute
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Matching logic |Default area code |parsed number |NPC category |Contact |
  | RC-CA |8 |7 |2482217 |Not Match extbut valid PSTN |205 |(205)2482217 |PSTN | (205)2482217 |
	| RC-UK |8 |8 |3135 0033 |Not Match extbut valid PSTN |12 |(12) 3135 0033 |PSTN |(12) 3135 0033 |

 */

import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  autorun,
  common,
  examples,
  Given,
  it,
  p1,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import type { StepProp } from '../../../../../../lib/step';

import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CreateMock,
  generateCallLogData,
  MockAccountInfo,
  MockCallLogSync,
  MockDialingPlan,
  MockExtensionInfo,
  MockGetPhoneNumber,
  MockNumberParserV2,
  MockPermission,
} from '../../../../../../steps/Mock';
import {
  CallButtonBehavior,
  CheckCallControlPage as BaseCheckCallControlPage,
  MakeCall,
} from '../../../../../../steps/Call';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { generateDialPlanData } from '../../../../../../__mock__/generateDialPlanData';
import { NavigateToHistory as BaseNavigateToHistory } from '../../../../../../steps/Navigate';

@autorun(test)
@it
@p1
@title(`Can call PSTN when can't match ext. but valid PSTN (DT<=MEL)`)
@common
export class DialPSTNSDPEnabled extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;
  historyTestId = 'History';
  CheckNumberInHistoryPage: StepFunction<any, any> = ({
    e164ParsedNumber,
  }: any) => {
    expect(screen.getByTitle(e164ParsedNumber)).toBeVisible();
  };
  CheckCallControlPage: typeof BaseCheckCallControlPage =
    BaseCheckCallControlPage;
  NavigateToHistory: typeof BaseNavigateToHistory = BaseNavigateToHistory;
  @examples(`
    | isoCode | MaxExtensionLength | phoneNumber | parsedNumber    | e164ParsedNumber |
    | 'AU'    | 8                  | '4009569'   | '34009569'      | '+6134009569'    |
    | 'GB'    | 8                  | '31350033'  | '028 3135 0033' | '+442831350033'  |
  `)
  run() {
    const {
      Login,
      CreateMock,
      historyTestId,
      NavigateToHistory,
      CheckCallControlPage,
      CheckNumberInHistoryPage,
    } = this;
    return (
      <Scenario
        desc="make an outbound call to pstn when sdp enabled"
        action={({
          maxExtensionLength,
          isoCode,
          parsedNumber,
          phoneNumber,
          e164ParsedNumber,
        }: any) => [
          CreateMock,
          <MockAccountInfo
            handler={(mockData) => {
              mockData.limits.maxExtensionNumberLength = maxExtensionLength;
              mockData.serviceInfo.brand.homeCountry.isoCode = isoCode;
              return mockData;
            }}
          />,
          MockGetPhoneNumber,
          <MockDialingPlan
            handler={() => {
              return [
                generateDialPlanData('61', '61', 'Australia', 'AU'),
                generateDialPlanData('44', '44', 'United Kingdom', 'GB'),
                generateDialPlanData('39', '39', 'Canada', 'CA'),
                generateDialPlanData('1', '1', 'United States', 'US'),
              ];
            }}
          />,
          <MockPermission
            handler={(features) => {
              return features
                .filter((feature) => feature.id !== 'SmartDialPlanRouting')
                .concat([
                  {
                    id: 'SmartDialPlanRouting',
                    available: true,
                  },
                ]);
            }}
          />,
          <MockExtensionInfo
            handle={(mockData) => {
              mockData.regionalSettings.homeCountry.isoCode = isoCode;
              return mockData;
            }}
          />,
          <MockCallLogSync
            isDefaultInit
            mockResponse={generateCallLogData({
              telephonySessionId: '767676543',
              direction: 'Outbound',
              toNumber: e164ParsedNumber,
              toName: 'Something New',
            })}
          />,
          <MockNumberParserV2
            isDefaultInit
            handler={(mockData) => {
              mockData.results[0].category = Category.Regular;
              mockData.results[0].formats = [
                {
                  ...mockData.results[0].formats[0],
                  e164Extended: this.example.e164ParsedNumber,
                  dialable: parsedNumber,
                  dialableExtended: parsedNumber,
                  national: parsedNumber,
                },
              ];
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="login App" action={Login} />
        <When
          desc="> Input{dialing text}in 'To' filed
										> Click call button"
          action={
            <MakeCall
              telephonySessionId="767676543"
              phoneNumber={this.example.phoneNumber}
            />
          }
        />
        <Then
          desc="Checked the dialing number on call control page is {parsed number}
										Checked Contact on the call control page is {Contact}"
          action={CheckCallControlPage}
        />
        <And
          desc="hang up current call"
          action={<CallButtonBehavior callButtonBehaviorType="hangup" />}
        />
        <When
          desc="go to call history page"
          action={<NavigateToHistory testId={historyTestId} />}
        />
        <Then
          desc="check number format in call history page"
          action={CheckNumberInHistoryPage}
        />
      </Scenario>
    );
  }
}
