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
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { StepProp } from '@ringcentral-integration/test-utils';
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
  p1,
  title,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../../../interfaces';
import {
  CallButtonBehavior,
  CheckActiveCallExist,
  CheckCallControlPage,
  MakeCall,
} from '../../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
  MockAddressBookSync,
  MockCallLogs,
  MockExtensionsList,
  MockGetPhoneNumber,
  MockGetTelephonyState,
  MockMessageSync,
  TriggerActiveCallChanged,
  mockExtensionsListData,
} from '../../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../../steps/Router';
import {
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../../../../../steps/Settings';

export const FAKE_IMAGE_URL =
  'https://platform.devtest.ringcentral.com/restapi/v1.0/account/129836006/extension/206745006/profile-image';

global.Image = class extends Image {
  constructor() {
    super();
    Promise.resolve().then(() => {
      this.onload?.({} as any);
    });
  }
};

jest.mock('@ringcentral-integration/commons/lib/formatNumber', () => {
  const { formatNumber } = jest.requireActual(
    '@ringcentral-integration/commons/lib/formatNumber',
  );
  return {
    formatNumber: jest.fn(formatNumber),
  };
});

export interface ExampleItem {
  direction: 'Inbound' | 'Outbound';
  phoneNumber: string;
  parsedNumber: string;
  contactName: string;
  contactType?: 'company' | 'personal';
  avatarType: 'custom' | 'blank';
}

@autorun(test)
@it
@p1
@title(
  'Inbound/Outbound with  different types contact call info on call control page CallInfo',
)
@common
export class CallInformation extends Step {
  CreateMock?: StepProp;
  Login?: StepProp;
  durationDataSign?: string;

  @examples(`
    | direction  | phoneNumber    | parsedNumber     | contactName | contactType | avatarType |
    | 'Inbound'  | '+17604215511' | '(760) 421-5511' | 'Contact X' | 'company'   | 'custom'   |
    | 'Outbound' | '+17604215522' | '(760) 421-5522' | 'Contact Y' | 'personal'  | 'blank'    |
    | 'Inbound'  | '+17604215544' | '(760) 421-5544' | 'Unknown'   | undefined   | 'blank'    |
  `)
  run() {
    const {
      Login = <CommonLogin CreateInstance={CreateInstance} />,
      CreateMock = CommonCreateMock,
      durationDataSign = 'duration',
    } = this;
    let userPhoneNumber: string | undefined;
    return (
      <Scenario
        desc="Inbound/Outbound with  different types contact call info on call control page"
        action={({ contactName, phoneNumber, contactType }: ExampleItem) => {
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
                  const data = mockExtensionsListData([
                    {
                      firstName: contactName.split(' ')[0],
                      lastName: contactName.split(' ')[1],
                      phoneNumber,
                      profileImage: {
                        uri: FAKE_IMAGE_URL,
                      },
                    },
                    {
                      firstName: 'Fake First Name',
                      lastName: 'Fake Last Name',
                      phoneNumber, // use the same number for multiple contact match
                      profileImage: {
                        uri: FAKE_IMAGE_URL,
                      },
                    },
                  ]);
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
                page={1}
                handler={(personalUsers) => {
                  const firstPersonalUser = personalUsers[0];
                  firstPersonalUser.firstName = contactName;
                  firstPersonalUser.middleName = '';
                  firstPersonalUser.lastName = '';
                  firstPersonalUser.homePhone = phoneNumber;
                  return [firstPersonalUser]; // take the first one only for avoid multiple match
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
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="Browser" />,
            ClickSaveButton,
          ]}
        />
        <When
          desc="Make an inbound/outbound call from/to Mr. X/Y/Z, check active call page"
          action={(
            { direction, phoneNumber, contactName }: ExampleItem,
            { phone }: Context,
          ) => [
            <NavigateTo path="/dialer" />,
            () => {
              userPhoneNumber = phone.dialerUI.getUIProps(phone).fromNumber;
              jest
                .spyOn(phone.accountContacts, 'getProfileImage')
                .mockResolvedValue(FAKE_IMAGE_URL);
            },
            <MakeCall
              useUserAgentSession
              phoneNumber={
                direction === 'Inbound' ? userPhoneNumber : phoneNumber
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
          action={({
            contactName,
            phoneNumber,
            parsedNumber,
            contactType,
            avatarType,
          }: ExampleItem) => [
            CheckActiveCallExist,
            <CheckCallControlPage
              showDuration
              durationDataSign={durationDataSign}
              name={contactName}
              parsedNumber={parsedNumber}
              contactDisplayType={
                contactType === 'company' ? 'contact-multiple-match' : 'normal'
              }
              showCustomAvatar={avatarType === 'custom'}
            />,
            // Check to ensure the expected "parsedNumber" on UI is formatted from "phoneNumber"
            () => {
              expect(formatNumber).toHaveBeenLastCalledWith({
                areaCode: expect.any(String),
                countryCode: expect.any(String),
                siteCode: expect.any(String),
                isEDPEnabled: expect.any(Boolean),
                isMultipleSiteEnabled: expect.any(Boolean),
                maxExtensionLength: expect.any(Number),
                phoneNumber,
              });
              expect(formatNumber).toHaveLastReturnedWith(parsedNumber);
            },
          ]}
        />
      </Scenario>
    );
  }
}

// Skip this in commons
// it is designed to be re-used in multiple products
// @autorun(test.skip)
@it
@p1
@title(
  'Inbound/Outbound with  different types contact call info on call control page, thirty party',
)
@common
export class CallInformationThirdParty extends Step {
  CreateMock?: StepProp;
  Login?: StepProp;
  SpyProfileImage?: StepProp;
  durationDataSign?: string;

  @examples(`
    | direction  | phoneNumber    | parsedNumber     | contactName |
    | 'Outbound' | '+17604215533' | '(760) 421-5533' | 'Contact Z' |
  `)
  run() {
    const {
      CreateMock, // = CommonCreateMock,
      Login, // = <CommonLogin CreateInstance={CreateInstance} />,
      SpyProfileImage,
      durationDataSign = 'duration',
    } = this;
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
            SpyProfileImage,
            <NavigateTo path="/settings/calling" />,
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="Browser" />,
            ClickSaveButton,
          ]}
        />
        <When
          desc="Make an inbound/outbound call from/to Mr. X/Y/Z, check active call page"
          action={({ direction, phoneNumber }: ExampleItem) => [
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
          action={({ contactName, parsedNumber }: ExampleItem) => [
            CheckActiveCallExist,
            <CheckCallControlPage
              showDuration
              durationDataSign={durationDataSign}
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
