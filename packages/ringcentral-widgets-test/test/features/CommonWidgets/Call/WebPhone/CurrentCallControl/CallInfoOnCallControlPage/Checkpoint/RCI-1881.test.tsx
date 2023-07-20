/**
 * RCI-1881: Inbound/Outbound with  different types contact call info on call control page
 * https://test_it_domain/test-cases/RCI-1881
 * Preconditions:
 *
  |               | RC company     |RC personal      |    3rd partye.gGooglecontact |not matched withanycontact       |
  | Has avatar      |   Mr. X    | |    Mr. Z    |                          |
	| Doesn't have avatar        |  |  Mr. Y |   |    Mr. R    |

 * Account type(/s):
 * RC US/CA/UK/EU/AU, TELUS, BT, AT&T
 * Extension type(/s):
 * Entry point(/s):
 *
 */

import type { StepProp } from '@ringcentral-integration/test-utils';
import {
  p1,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  And,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import {
  CreateMock,
  MockAddressBookSync,
  MockExtensionsList,
  MockCallLogs,
  MockMessageSync,
  TriggerActiveCallChanged,
  mockExtensionsListData,
  MockGetTelephonyState,
  MockGetPhoneNumber,
} from '../../../../../../../steps/Mock';
import { CreateInstance } from '../../../../../../../steps/CreateInstance';
import {
  ClickSaveButton,
  ExpandDropdown,
  SelectCallingSetting,
} from '../../../../../../../steps/Settings';
import {
  CallButtonBehavior,
  CheckActiveCallExist,
  MakeCall,
  CheckCallControlPage,
} from '../../../../../../../steps/Call';
import { NavigateTo } from '../../../../../../../steps/Router/action';

const IMAGE_URL =
  'https://platform.devtest.ringcentral.com/restapi/v1.0/account/129836006/extension/206745006/profile-image';

global.Image = class extends Image {
  constructor() {
    super();
    Promise.resolve().then(() => {
      this.onload?.({} as any);
    });
  }
};

@autorun(test.skip)
@it
@p1
@title(
  'Inbound/Outbound with  different types contact call info on call control page',
)
export class CallInformation extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  userPhoneNumber = '';
  @examples(`
    | direction  | phoneNumber    | parsedNumber     | contactName | contactType | avatarType |
    | 'Inbound'  | '+17604215511' | '(760) 421-5511' | 'Contact X' | 'company'  | 'custom'    |
    | 'Outbound' | '+17604215522' | '(760) 421-5522' | 'Contact Y' | 'personal'  | 'blank'    |
    | 'Inbound'  | '+17604215544' | '(760) 421-5544' | 'Unknown'   | undefined   | 'blank'    |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Inbound/Outbound with  different types contact call info on call control page"
        action={async ({ contactName, phoneNumber, contactType }: any) => {
          const actions = [
            CreateMock,
            <MockGetPhoneNumber />,
            <MockCallLogs isDefaultInit repeat={0} />,
            <MockMessageSync isDefaultInit repeat={0} />,
            MockGetTelephonyState,
          ];
          if (contactType === 'company') {
            actions.push(
              <MockExtensionsList
                handler={(mockData) => {
                  const data = mockExtensionsListData({
                    firstName: contactName.split(' ')[0],
                    lastName: contactName.split(' ')[1],
                    phoneNumber,
                    profileImage: {
                      uri: IMAGE_URL,
                    },
                  });
                  return {
                    ...mockData,
                    ...data,
                  };
                }}
              />,
            );
          }
          if (contactType === 'personal') {
            actions.push(
              <MockAddressBookSync
                handler={(personalUsers) => {
                  const firstPersonalUser = personalUsers[0];
                  firstPersonalUser.firstName = contactName;
                  firstPersonalUser.middleName = '';
                  firstPersonalUser.lastName = '';
                  firstPersonalUser.homePhone = phoneNumber;
                  return personalUsers;
                }}
              />,
            );
          }
          return actions;
        }}
      >
        <Given desc="Login in the CTI" action={Login} />
        <And
          desc="Web Phone is enabled and 'Browser'  is selected in Settings > Calling > Make my calls with"
          action={[
            <NavigateTo path="/settings/calling" />,
            ExpandDropdown,
            <SelectCallingSetting settingName="Browser" />,
            ClickSaveButton,
          ]}
        />
        <When
          desc="Make an inbound/outbound call from/to Mr. X/Y/Z, check active call page"
          action={async ({ direction, phoneNumber, contactName }: any) => [
            <NavigateTo path="/dialer" />,
            (_: any, { phone }: any) => {
              this.userPhoneNumber =
                phone.dialerUI.getUIProps(phone).fromNumber;
              jest
                .spyOn(phone.accountContacts, 'getProfileImage')
                .mockResolvedValue(IMAGE_URL);
            },
            <MakeCall
              useUserAgentSession
              phoneNumber={
                direction === 'Inbound' ? this.userPhoneNumber : phoneNumber
              }
              direction={direction}
              status="connected"
              fromNumberData={
                direction === 'Inbound'
                  ? {
                      name: contactName,
                      extensionId: '101',
                      phoneNumber,
                    }
                  : undefined
              }
            />,
            TriggerActiveCallChanged,
          ]}
        />
        <Then
          desc="The following information are shown:
                  Avatar: show for Mr.X and Mr.Z (Mr.Zis not valid for Outlook), blank avatar for Mr.Y
                  Name: show contact name for Mr.X,Mr.Y and Mr.Z;
                  Phone Number: show number for Mr.X, Mr.Y , Mr.Z
                  Duration: show digital clock 'xx:xx' on top right corner of the call control page e.g 01:11 mean one minute and eleven seconds
                Note:
                  Outbound will be shown digital clock when click the call button
                  Inbound will be shown digital clock only when click the answer button"
          action={async ({
            contactName,
            parsedNumber,
            contactType,
            avatarType,
          }: any) => [
            CheckActiveCallExist,
            <CheckCallControlPage
              showDuration
              name={contactName}
              parsedNumber={parsedNumber}
              type={contactType}
              showCustomAvatar={avatarType === 'custom'}
            />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p1
@title(
  'Inbound/Outbound with  different types contact call info on call control page',
)
export class CallInformationThirdParty extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples(`
    | direction  | phoneNumber    | parsedNumber     | contactName |
    | 'Outbound' | '+17604215533' | '(760) 421-5533' | 'Contact Z' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Inbound/Outbound with  different types contact call info on call control page"
        action={[
          CreateMock,
          <MockCallLogs isDefaultInit repeat={0} />,
          <MockMessageSync isDefaultInit repeat={0} />,
          MockGetTelephonyState,
        ]}
      >
        <Given desc="Login in the CTI" action={Login} />
        <And
          desc="Web Phone is enabled and 'Browser'  is selected in Settings > Calling > Make my calls with"
          action={[
            (_: any, { phone }: any) => {
              jest
                .spyOn(phone.googleContacts, 'getProfileImage')
                .mockResolvedValue(IMAGE_URL);
            },
            <NavigateTo path="/settings/calling" />,
            ExpandDropdown,
            <SelectCallingSetting settingName="Browser" />,
            ClickSaveButton,
          ]}
        />
        <When
          desc="Make an inbound/outbound call from/to Mr. X/Y/Z, check active call page"
          action={async ({ direction, phoneNumber, contactName }: any) => [
            // pre call to fetch image source
            <MakeCall
              useUserAgentSession
              phoneNumber={phoneNumber}
              direction={direction}
              status="connected"
            />,
            <CallButtonBehavior callButtonBehaviorType="hangup" />,
            <MakeCall
              useUserAgentSession
              phoneNumber={phoneNumber}
              direction={direction}
              status="connected"
            />,
            TriggerActiveCallChanged,
          ]}
        />
        <Then
          desc="The following information are shown:
                  Avatar: show for Mr.X and Mr.Z (Mr.Zis not valid for Outlook), blank avatar for Mr.Y
                  Name: show contact name for Mr.X,Mr.Y and Mr.Z;
                  Phone Number: show number for Mr.X, Mr.Y , Mr.Z
                  Duration: show digital clock 'xx:xx' on top right corner of the call control page e.g 01:11 mean one minute and eleven seconds
                Note:
                  Outbound will be shown digital clock when click the call button
                  Inbound will be shown digital clock only when click the answer button"
          action={async ({ contactName, parsedNumber }: any) => [
            CheckActiveCallExist,
            <CheckCallControlPage
              showDuration
              showCustomAvatar
              name={contactName}
              parsedNumber={parsedNumber}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
