/**
 * RCI-3625: To field contact search UX
 * https://test_it_domain/test-cases/RCI-3625
 * Preconditions:
 * RC CTI app is installed and enabled
 * RC CTI App should beauthorizedto 3rd party
 * User has login RC CTI App withAccountA
 * Extension type(/s):
 * Entry point(/s):
 * Entry point(/s):
 * Dial Pad
 * Compose Text
 * Current call control > Transfer
 * Single/Second incoming call > Forward > Custom number
 */
import { extensionStatusTypes } from '@ringcentral-integration/commons/enums/extensionStatusTypes';
import {
  p2,
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
  WaitForRenderReady,
  common,
} from '@ringcentral-integration/test-utils';

import {
  CallButtonBehavior,
  CheckIncomingCallPageExist,
  ClickBackButton,
  CustomForwardCall,
  GoToTransferPage,
  MakeCall,
} from '../../../../../steps/Call';
import { ClickCurrentName } from '../../../../../steps/CallHistory';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  FocusOnRecipients,
  InputRecipients,
} from '../../../../../steps/Messages';
import {
  CreateMock,
  MockExtensionsList,
  mockExtensionsListData,
  MockMessageSync,
  MockNumberParserV2,
  TriggerActiveCallChanged,
} from '../../../../../steps/Mock';
import {
  NavigateToComposeText,
  NavigateToDialer,
} from '../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../steps/Router';
import {
  CheckContactDropdownList,
  CheckNotContactsMatched,
  CheckRecipientInput,
  ClickContactItem,
  DeleteRecipientItem,
} from '../../../../../steps/SearchField';
import {
  CheckInputToRecipientsNoExist,
  CheckToFieldValue,
} from '../../../../../steps/dialer';

@autorun(test.skip)
@it
@p2
@common
@title('To field contact search UX')
export class ToFieldContactsUX extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  @examples([
    {
      entry: <NavigateToDialer />,
      action: <InputRecipients content="Tes" />,
      shouldKeptInput: true,
    },
    {
      entry: <NavigateToComposeText messageTabName="messagesTab" />,
      action: <InputRecipients content="Tes" />,
      shouldKeptInput: true,
    },
    {
      entry: (
        <>
          <MakeCall />
          <CallButtonBehavior callButtonBehaviorType="callActions" />
          <GoToTransferPage />
        </>
      ),
      action: <InputRecipients content="Tes" />,
      shouldKeptInput: false,
    },
    {
      entry: (
        <>
          <MakeCall direction="Inbound" useUserAgentSession />
          <CheckIncomingCallPageExist />
          <CustomForwardCall customSelector="customNumber" />
        </>
      ),
      backToEntry: (
        <>
          <TriggerActiveCallChanged />
          <NavigateTo path="/calls" />
          <ClickCurrentName />
          <WaitForRenderReady />
          <CustomForwardCall customSelector="customNumber" />
        </>
      ),
      action: <InputRecipients content="Tes" containerSelector="forwardPage" />,
      shouldKeptInput: false,
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="To field contact search UX">
        <Given
          desc="Login app with RC account
								Go to entry point"
          action={[
            CreateMock,
            <MockMessageSync repeat={0} />,
            <MockNumberParserV2 repeat={0} />,
            <MockExtensionsList
              handler={(mockData) => ({
                ...mockData,
                ...mockExtensionsListData([
                  {
                    firstName: 'Test',
                    lastName: 'user',
                    extensionNumber: '101',
                    status: extensionStatusTypes.notActivated,
                    phoneNumber: '+12054332854',
                    hidden: false,
                    phoneNumberHidden: false,
                  },
                ]),
              })}
            />,
            Login,
            this.example.entry,
            WaitForRenderReady,
          ]}
        />
        <When
          desc="> Enter 'Tes' in the 'To' field
                > Switch to Settings
                > Back to the Phone page"
          action={[
            this.example.action,
            () => {
              const actions = [];
              if (this.example.backToEntry) {
                actions.push(ClickBackButton);
              }
              return actions;
            },
            <NavigateTo path="/settings" />,
            this.example.backToEntry
              ? this.example.backToEntry
              : this.example.entry,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="The inputted text should be kept as {shouldKeptInput}"
          action={[
            () => {
              const actions = [];
              if (this.example.shouldKeptInput) {
                actions.push(<CheckToFieldValue value="Tes" />);
              }
              return actions;
            },
            WaitForRenderReady,
          ]}
        />
        <When
          desc="Select one of the matched contacts"
          action={[
            () => {
              const actions = [];
              actions.push(
                this.example.shouldKeptInput
                  ? FocusOnRecipients
                  : this.example.action,
              );
              return actions;
            },
            WaitForRenderReady,
            <CheckContactDropdownList name="Test user" />,
            <ClickContactItem index={0} />,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="The list of matching contacts will disappear
										The selected contact item should display in the 'To' field with an 'X' button"
          action={[
            CheckNotContactsMatched,
            <CheckRecipientInput name="Test user" />,
          ]}
        />
        <When
          desc="Click the 'X' button on the item"
          action={DeleteRecipientItem}
        />
        <Then
          desc="The item should be removed from 'To' field"
          action={CheckInputToRecipientsNoExist}
        />
      </Scenario>
    );
  }
}
