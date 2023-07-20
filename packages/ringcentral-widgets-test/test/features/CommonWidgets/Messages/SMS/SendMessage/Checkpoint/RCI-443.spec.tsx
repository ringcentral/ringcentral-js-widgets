/**
 * RCI-443: Prompt user to enter area code if it isn't set before sending SMS to local number
 * https://test_it_domain/test-cases/RCI-443
 * Preconditions:
 * User is logged in to the 3-rd party
 * CTI app is installed
 * Account_A and Account_B belong to below brand accounts
 * US/CA is set as the dialing plan and the area code is not set
 * Entry point(/s):
 *
  | Entry |Account type |
  | 1 |Account_A |
	| 2 |Account_B |

 * > LoginCTI APP with {Account type}
 * > Go to 'Messages' tab
 * > Click'Compose Text' icon
 * > Enter 7 digit lcoal number(eg.858-7301)
 * > Fill Text 'Test sms' into 'Type message' field
 * > Click 'Send'
 */

import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction, StepProp } from '../../../../../../lib/step';
import {
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '../../../../../../lib/step';
import {
  CheckAlertMessage,
  CloseAlertMessage,
} from '../../../../../../steps/Alert';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { SendSMS } from '../../../../../../steps/Messages';
import {
  MockDialingPlan,
  MockExtensionInfo,
  MockPermission,
} from '../../../../../../steps/Mock';
import { NavigateToComposeText } from '../../../../../../steps/Navigate';
import {
  CheckUserAtRegionSettings,
  SetAreaCode,
} from '../../../../../../steps/Settings';

@autorun(test.skip)
@it
@p2
@common
@title(
  "Prompt user to enter area code if it isn't set before sending SMS to local number",
)
export class PromptUserToEnterAreaCode extends Step {
  CustomLogin: StepFunction<any, any> | null = null;
  CustomCreateMock: StepProp | null = null;
  @examples([
    {
      entry: 1,
      dialingPlansData: {
        records: [
          {
            uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/1',
            id: '1',
            name: 'United States',
            isoCode: 'US',
            callingCode: '1',
          },
        ],
      },
      permissionData: {
        id: 'SMSSending',
        available: true,
      },
      message: 'Please set area code to use 7-digit local phone numbers.',
    },
    {
      entry: 2,
      dialingPlansData: {
        records: [
          {
            uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/224',
            id: '224',
            name: 'United Kingdom',
            isoCode: 'GB',
            callingCode: '44',
          },
        ],
      },
      permissionData: {
        id: 'SMSSending',
        available: false,
      },
      message:
        "You don't have permission to send messages to recipients outside of your organization.",
    },
  ])
  run() {
    const { CustomLogin = CommonLogin, CustomCreateMock } = this;
    return (
      <Scenario desc="Prompt user to enter area code if it isn't set before sending SMS to local number">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CustomCreateMock,
            <MockPermission
              handler={(features) => {
                return features
                  .filter((feature) => feature.id !== 'SMSSending')
                  .concat([this.context.example.permissionData]);
              }}
            />,
            <MockExtensionInfo
              handle={(mockData) => {
                mockData.regionalSettings.homeCountry = {
                  ...mockData.regionalSettings.homeCountry,
                  isoCode: 'US',
                };
                return mockData;
              }}
            />,
            <MockDialingPlan
              handler={() => this.context.example.dialingPlansData.records}
            />,
            CustomLogin,
          ]}
        />
        <Given desc="Go to message tab" />
        <Given
          desc="Click 'Compose Text' icon"
          action={<NavigateToComposeText />}
        />
        <Given desc="Enter 7 digit local number(eg. 858-7301)" />
        <When
          desc="Fill Text 'Test sms' into 'Type message' field, Click Send'"
          action={<SendSMS textMessage="Test sms" phoneNumber="858-7301" />}
        />
        <Then
          desc="For entry1:
								The message is not sent but prompts the user:
								Please set area code to use 7-digit local phone numbers.
								For entry 2:
								The message is not sent but prompts the user:
								You don't have permission to send messages to recipients outside of your organization.[L10N]"
          action={() => {
            if (this.context.example.entry === 2) {
              return [
                <CloseAlertMessage message="The previous region is no longer supported for your account." />,
                <CheckAlertMessage message={this.context.example.message} />,
              ];
            }
            return <CheckAlertMessage message={this.context.example.message} />;
          }}
        />
        <When
          desc="Click 'area code' in the entry1"
          action={() => {
            if (this.context.example.entry === 1) {
              fireEvent.click(screen.getByText('area code'));
            }
          }}
        />
        <Then
          desc="User is navigated to Region settings page."
          action={() => {
            if (this.context.example.entry === 1) {
              return CheckUserAtRegionSettings;
            }
          }}
        />
        <When
          desc="Set the area code and back to Compose Text page"
          action={() => {
            if (this.context.example.entry === 1) {
              return [<SetAreaCode areaCode="123" />, NavigateToComposeText];
            }
          }}
        />
        <Then
          desc="The message text just entered are still existing"
          action={() => {
            if (this.context.example.entry === 1) {
              expect(screen.getByTestId('messageInput')).toHaveValue(
                'Test sms',
              );
            }
          }}
        />
      </Scenario>
    );
  }
}
