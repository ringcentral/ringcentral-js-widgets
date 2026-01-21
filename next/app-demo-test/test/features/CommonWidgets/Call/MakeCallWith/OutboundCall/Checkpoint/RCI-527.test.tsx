/**
 * RCI-527: Outbound call - Local dialing
 * https://test_it_domain/test-cases/RCI-527
 * Preconditions:
 * <ol><li style='margin: 0px; padding: 0px;'> User is logged-in into 3rd party</li><li style='margin: 0px; padding: 0px;'> CTI app is integrated</li><li style='margin: 0px; padding: 0px;'>User has logged into CTI app with the  account which has multiple dialing plans</li></ol><p><strong><span style='color:#669966'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p><table class='table table-bordered'><tbody><tr><td><b>Call type</b></td><td><b>EDP</b></td><td><b>Region</b></td><td><b>Area code</b></td><td><b>Phone number</b></td><td><b>Display number</b></td></tr><tr><td>RingCentral Phone</td><td>On</td><td>US</td><td>-</td><td>6501234567</td><td>6501234567<br></td></tr><tr><td>RingCentral Phone<br></td><td>Off</td><td>CA</td><td>250</td><td>1234567</td><td>2501234567<br></td></tr><tr><td>RingCentral Phone<br></td><td>On</td><td>UK</td><td>020</td><td>81890881<br></td><td>02081890881</td></tr><tr><td>Ringout<br></td><td>Off</td><td>UK</td><td>-</td><td>+16504091529<br></td><td>+16504091529<br></td></tr><tr><td>Ringout<br></td><td>Off<br></td><td>US</td><td>650</td><td>1234567<br></td><td>6501234567</td></tr><tr><td>Ringout<br></td><td>On</td><td>US</td><td>-</td><td>+448081890881<br></td><td>+448081890881<br></td></tr></tbody></table><p><br></p>
 */
import { CallingSettings } from '@ringcentral-integration/micro-phone/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  autorun,
  common,
  examples,
  it,
  p2,
  Scenario,
  screen,
  Step,
  StepFunction,
  Then,
  title,
  userEvent,
  waitForRenderReady,
  When,
  within,
} from '@ringcentral-integration/test-utils';

import { generateDialPlanData } from '../../../../../../__mock__/generateDialPlanData';
import * as customSteps from '../../../../../../steps/AISteps';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
  MockDialingPlan,
  MockNumberParserV2,
  MockPhoneNumber,
} from '../../../../../../steps/Mock';
import {
  NavigateToCallingSetting,
  NavigateToDialer,
} from '../../../../../../steps/Navigate';

interface ExampleProps {
  callType: string;
  regionName: string;
  edp: string;
  region: string;
  areaCode: string;
  phoneNumber: string;
  displayNumber: string;
  callingMode: string;
}

@autorun(test)
@it
@p2
@title('Outbound call - Local dialing')
@common
export class CheckRcPhoneUS extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  @examples(`
    | callType            | callingMode              | edp   | region | regionName             | areaCode | phoneNumber     | displayNumber   |
    | 'RingOut'           | 'callingModes-ringout'   | 'off' | 'UK'   | '(+44) United Kingdom' | '-'      | '+16504091529'  | '+16504091529'  |
    | 'RingCentral Phone' | 'callingModes-softphone' | 'on'  | 'US'   | '(+1) United States'   | '-'      | '6501234567'    | '6501234567'    |
    | 'RingOut'           | 'callingModes-ringout'   | 'on'  | 'US'   | '(+1) United States'   | '-'      | '+448081890881' | '+448081890881' |
  `)
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Outbound call - Local dialing ${phoneNumber}"
        action={[
          CreateMock,
          <MockDialingPlan
            handler={() =>
              [
                generateDialPlanData('1', '1', 'United States', 'US'),
                generateDialPlanData('44', '224', 'United Kingdom', 'GB'),
                generateDialPlanData('1', '39', 'Canada', 'CA'),
              ] as never
            }
          />,
          Login,
          (async ({ edp }: ExampleProps, { app }) => {
            // mock edp
            app.modules.Brand.setDynamicConfig({
              ...app.modules.Brand.brandConfig,
              enableEDP: edp === 'on',
            });
            expect(app.modules.AppFeatures.isEDPEnabled).toBe(edp === 'on');

            // mock make call
            jest
              .spyOn(app.modules.Softphone, 'makeCall')
              .mockResolvedValue(true);
            jest.spyOn(app.modules.Ringout, 'makeCall').mockResolvedValue(true);
          }) as StepFunction,
        ]}
      >
        <When
          desc="> Settings > Calling > Make my calls with > {Call type}
										> Region
										> Set {Region} as country
										> Enter {Area code} > Save
										> Go to dialer, enter {Phone number}"
        />
        <Then
          desc="Call is placed to {Display number}
										{Area code} is added before the 7 digital number"
        />
        <Then
          desc=""
          action={[
            NavigateToCallingSetting,
            async () => {
              // wait for render ready
              // {"custom_step":{"WaitForRenderReady":{}},"action":"wait","wait_type":"None","test_id":"","expected_value":""}
              await customSteps['WaitForRenderReady'].action();
            },
            async () => {
              // Click option Browser to open the dropdown list
              // {"action":"click","test_id":"selectedItem","expected_value":""}
              const element = await within(
                screen.getByTestId('callingSetting'),
              ).findByTestId('selectedItem');
              userEvent.click(element);
            },
            (async ({ callType }, { app }) => {
              // in ringcentral-js-widgets/ringcentral-widgets/components/CallingSettingsPanel/CallingSettingsPanel.tsx
              // when user change call type that will reset user call location to availableNumbersWithLabel?.[0]?.value, if there is no value, the save button will keep disabled.
              // the the click save button action will be blocked by the disabled save button.
              const callingSettings = app.container.got(CallingSettings)!;

              await whenStateChange(() => {
                expect(
                  callingSettings.availableNumbersWithLabel.length > 0,
                ).toBeTruthy();
              });
            }) as StepFunction<ExampleProps>,
            async ({ callType }: ExampleProps) => {
              // User should see 'RingCentral Phone' in the dropdown list
              // {"action":"getValue","test_id":"option_RingCentral Phone","expected_value":"RingCentral Phone"}

              const item = await whenStateChange(() => {
                const element = screen.getByTestId(`option_${callType}`);
                const value = element.textContent;
                expect(value).toBe(`${callType}`);
                return element;
              });

              userEvent.click(item);
            },
            ClickSaveButton,
            async () => {
              // Click back button
              // {"action":"click","test_id":"backButton","expected_value":"","wait_type":"None"}

              const element = await screen.findByTestId('backButton');
              userEvent.click(element);
            },
            async () => {
              // Click 'Region' in the page
              // {"action":"click","test_id":"region","expected_value":""}

              const element = await screen.findByTestId('region');
              userEvent.click(element);
            },
            async () => {
              // !!Note: AI failed to find the element
              // Click option to open dropdown list
              // {"action":"click","test_id":"dropdownSelect","expected_value":"open dropdown list"}

              const element = await screen.findByTestId('selectedItem');
              userEvent.click(element);
            },
            async ({ regionName }: ExampleProps) => {
              // Click listitem (+1) United States in the dropdown list
              // {"action":"click","test_id":"selectedItem","expected_value":"+1 United States","index":"1"}

              const element = await screen.findByTestId(regionName);
              userEvent.click(element);
            },
            ClickSaveButton,
            async () => {
              // Click back button
              // {"action":"click","test_id":"backButton","expected_value":"","wait_type":"None"}

              const element = await screen.findByTestId('backButton');
              userEvent.click(element);
            },
            NavigateToDialer,
            async () => {
              // Wait for render ready
              // {"action":"wait","wait_type":"None","test_id":"","expected_value":""}
              await customSteps['WaitForRenderReady'].action();
            },
            async ({ phoneNumber }: ExampleProps) => {
              // Type 6501234567 in the 'To' field
              // {"action":"type","test_id":"recipientsInput","expected_value":"6501234567"}

              const element = screen.getByTestId('recipientsInput');
              userEvent.type(element, phoneNumber);
            },
            async () => {
              const callBtn = await whenStateChange(() => {
                const callBtn = screen.getByTestId('callButton');

                expect(callBtn).toBeEnabled();

                return callBtn;
              });
              userEvent.click(callBtn);
            },
            (async (
              { callType, displayNumber, callingMode }: ExampleProps,
              { app },
            ) => {
              await whenStateChange(() => {
                if (callType === 'RingCentral Phone') {
                  expect(app.modules.Softphone.makeCall).toHaveBeenCalledWith(
                    displayNumber,
                    callingMode,
                  );
                } else {
                  expect(app.modules.Ringout.makeCall).toHaveBeenCalledWith(
                    expect.objectContaining({
                      toNumber: displayNumber,
                    }),
                  );
                }
              });
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@it
@p2
@title('Outbound call - Local dialing')
@common
export class CheckWithAreaCode extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  @examples(`
    | callType            | callingMode              | edp   | region | regionName           | areaCode | phoneNumber | displayNumber  |
    | 'RingCentral Phone' | 'callingModes-softphone' | 'off' | 'CA'   | '(+1) Canada'        | '250'    | '1234567'   | '+12501234567' |
    | 'RingOut'           | 'callingModes-ringout'   | 'off' | 'US'   | '(+1) United States' | '650'    | '1234567'   | '+16501234567' |
  `)
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Outbound call - Local dialing ${phoneNumber}"
        action={[
          CreateMock,
          <MockDialingPlan
            handler={() =>
              [
                generateDialPlanData('1', '1', 'United States', 'US'),
                generateDialPlanData('44', '224', 'United Kingdom', 'GB'),
                generateDialPlanData('1', '39', 'Canada', 'CA'),
              ] as never
            }
          />,
          <MockPhoneNumber
            isDefaultInit
            handler={(phoneNumberData) => ({
              ...phoneNumberData,
              records: [
                {
                  ...phoneNumberData.records[0],
                  features: [
                    'CallerId',
                    'SmsSender',
                    'MmsSender',
                    'InternationalSmsSender',
                  ],
                  id: 431458088,
                  phoneNumber: '+12814750299',
                  type: 'VoiceFax',
                  usageType: 'DirectNumber',
                  primary: true,
                },
              ],
            })}
          />,
          Login,
          (async ({ edp }: ExampleProps, { app }) => {
            // mock edp
            app.modules.Brand.setDynamicConfig({
              ...app.modules.Brand.brandConfig,
              enableEDP: edp === 'on',
            });
            expect(app.modules.AppFeatures.isEDPEnabled).toBe(edp === 'on');

            // mock make call
            jest
              .spyOn(app.modules.Softphone, 'makeCall')
              .mockResolvedValue(true);
            jest.spyOn(app.modules.Ringout, 'makeCall').mockResolvedValue(true);
          }) as StepFunction,
        ]}
      >
        <When
          desc="> Settings > Calling > Make my calls with > {Call type}
										> Region
										> Set {Region} as country
										> Enter {Area code} > Save
										> Go to dialer, enter {Phone number}"
        />
        <Then
          desc="Call is placed to {Display number}
										{Area code} is added before the 7 digital number"
        />
        <Then
          desc=""
          action={[
            NavigateToCallingSetting,
            async () => {
              // wait for render ready
              // {"custom_step":{"WaitForRenderReady":{}},"action":"wait","wait_type":"None","test_id":"","expected_value":""}
              await customSteps['WaitForRenderReady'].action();
            },
            async () => {
              // Click selected item to open the dropdown list
              // { "action": "click", "test_id": "selectedItem", "expected_value": "" }

              const element = await within(
                screen.getByTestId('callingSetting'),
              ).findByTestId('selectedItem');
              userEvent.click(element);
            },
            async ({ callType }: ExampleProps) => {
              // User should see 'RingOut' in the dropdown list
              // {"action":"getValue","test_id":"option_RingOut","expected_value":"RingOut"}
              const element = screen.getByTestId(`option_${callType}`);
              const value = element.textContent;
              expect(value).toBe(`${callType}`);
            },
            async ({ callType }: ExampleProps) => {
              // Click 'RingOut' in the dropdown list
              // {"action":"click","test_id":"option_RingOut","expected_value":"","wait_type":"None"}

              const element = await screen.findByTestId(`option_${callType}`);
              userEvent.click(element);
            },
            ClickSaveButton,
            async () => {
              // Click back button
              // {"action":"click","test_id":"backButton","expected_value":"","wait_type":"None"}

              const element = await screen.findByTestId('backButton');
              userEvent.click(element);
            },
            async () => {
              // Click Region item in the page
              // {"action":"click","test_id":"region","expected_value":""}

              const element = await screen.findByTestId('region');
              userEvent.click(element);
            },
            async () => {
              // Click selected item to open dropdown list
              // {"action":"click","test_id":"selectedItem","expected_value":""}

              const element = await screen.findByTestId('selectedItem');
              userEvent.click(element);
            },
            async ({ regionName }: ExampleProps) => {
              // Click listitem (+44) United Kingdom in the dropdown list
              // {"action":"click","test_id":"(+44) United Kingdom","expected_value":"(+44) United Kingdom"}

              const element = await screen.findByTestId(regionName);
              userEvent.click(element);
            },
            async ({ areaCode }: ExampleProps) => {
              const element = screen.getByTestId('areaCodeInputField');
              userEvent.type(element, areaCode);
            },
            async () => {
              // Click save button
              // {"action":"click","test_id":"saveButton","expected_value":""}

              const element = await screen.findByTestId('saveButton');
              userEvent.click(element);
            },
            async () => {
              // Click back button
              // {"action":"click","test_id":"backButton","expected_value":""}

              const element = await screen.findByTestId('backButton');
              userEvent.click(element);
            },
            NavigateToDialer,
            async () => {
              // Wait for render ready
              // {"custom_step":{"WaitForRenderReady":{}},"action":"wait","wait_type":"None","test_id":"","expected_value":""}
              await customSteps['WaitForRenderReady'].action();
            },
            async ({ phoneNumber }: ExampleProps) => {
              // Type +16504091529 in the 'To' field
              // {"action":"type","test_id":"recipientsInput","expected_value":"+16504091529"}

              const element = screen.getByTestId('recipientsInput');
              userEvent.type(element, phoneNumber);
            },
            async () => {
              if (screen.queryByTestId('callButton')) {
                userEvent.click(screen.getByTestId('callButton'));
              }
              // Press Enter in the 'To' field
              // {"custom_step":{"FireEventKeyDown":{"elementId":"recipientsInput","key":"Enter","code":"Enter"}},"action":"customStep","test_id":"recipientsInput","expected_value":""}
              await customSteps['FireEventKeyDown'].action({
                elementId: 'recipientsInput',
                key: 'Enter',
                code: 'Enter',
              });
            },
            (async (
              { callType, callingMode, displayNumber }: ExampleProps,
              { app },
            ) => {
              await whenStateChange(() => {
                if (callType === 'RingCentral Phone') {
                  expect(app.modules.Softphone.makeCall).toHaveBeenCalledWith(
                    displayNumber,
                    callingMode,
                  );
                } else {
                  expect(app.modules.Ringout.makeCall).toHaveBeenCalledWith(
                    expect.objectContaining({
                      toNumber: displayNumber,
                    }),
                  );
                }
              });
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@it
@p2
@title('Outbound call - Local dialing')
@common
export class CheckWithUkAreaCode extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  @examples(`
    | callType            | callingMode              | edp  | region | regionName             | areaCode | phoneNumber | displayNumber |
    | 'RingCentral Phone' | 'callingModes-softphone' | 'on' | 'UK'   | '(+44) United Kingdom' | '020'    | '81890881'  | '+4481890881' |
  `)
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Outbound call - Local dialing ${phoneNumber}"
        action={[
          CreateMock,
          <MockDialingPlan
            handler={() =>
              [
                generateDialPlanData('1', '1', 'United States', 'US'),
                generateDialPlanData('44', '224', 'United Kingdom', 'GB'),
                generateDialPlanData('1', '39', 'Canada', 'CA'),
              ] as never
            }
          />,
          <MockPhoneNumber
            isDefaultInit
            handler={(phoneNumberData) => ({
              ...phoneNumberData,
              records: [
                {
                  ...phoneNumberData.records[0],
                  features: [
                    'CallerId',
                    'SmsSender',
                    'MmsSender',
                    'InternationalSmsSender',
                  ],
                  id: 431458088,
                  phoneNumber: '+12814750299',
                  type: 'VoiceFax',
                  usageType: 'DirectNumber',
                  primary: true,
                },
              ],
            })}
          />,
          <MockNumberParserV2
            handler={(mockData) => {
              mockData.results[0].formats[0] = {
                ...mockData.results[0].formats[0],
                e164Extended: '+4481890881',
                e164: '+4481890881',
              };
              return mockData;
            }}
          />,
          Login,
          (async ({ edp }: ExampleProps, { app }) => {
            // mock edp
            app.modules.Brand.setDynamicConfig({
              ...app.modules.Brand.brandConfig,
              enableEDP: edp === 'on',
            });
            expect(app.modules.AppFeatures.isEDPEnabled).toBe(edp === 'on');

            // mock make call
            jest
              .spyOn(app.modules.Softphone, 'makeCall')
              .mockResolvedValue(true);
            jest.spyOn(app.modules.Ringout, 'makeCall').mockResolvedValue(true);
          }) as StepFunction,
        ]}
      >
        <When
          desc="> Settings > Calling > Make my calls with > {Call type}
										> Region
										> Set {Region} as country
										> Enter {Area code} > Save
										> Go to dialer, enter {Phone number}"
        />
        <Then
          desc="Call is placed to {Display number}
										{Area code} is added before the 7 digital number"
        />
        <Then
          desc=""
          action={[
            NavigateToCallingSetting,
            async () => {
              // wait for render ready
              // {"custom_step":{"WaitForRenderReady":{}},"action":"wait","wait_type":"None","test_id":"","expected_value":""}
              await customSteps['WaitForRenderReady'].action();
            },
            async () => {
              // Click selected item to open the dropdown list
              // { "action": "click", "test_id": "selectedItem", "expected_value": "" }

              const element = await within(
                screen.getByTestId('callingSetting'),
              ).findByTestId('selectedItem');
              userEvent.click(element);
            },
            async ({ callType }: ExampleProps) => {
              // User should see 'RingOut' in the dropdown list
              // {"action":"getValue","test_id":"option_RingOut","expected_value":"RingOut"}
              const element = screen.getByTestId(`option_${callType}`);
              const value = element.textContent;
              expect(value).toBe(`${callType}`);
            },
            async ({ callType }: ExampleProps) => {
              // Click 'RingOut' in the dropdown list
              // {"action":"click","test_id":"option_RingOut","expected_value":"","wait_type":"None"}

              const element = await screen.findByTestId(`option_${callType}`);
              userEvent.click(element);
            },
            async () => {
              // Click save button
              // {"action":"click","test_id":"saveButton","expected_value":""}

              const element = await screen.findByTestId('saveButton');
              userEvent.click(element);
            },
            async () => {
              // Click back button
              // {"action":"click","test_id":"backButton","expected_value":"","wait_type":"None"}

              const element = await screen.findByTestId('backButton');
              userEvent.click(element);
            },
            async () => {
              // Click Region item in the page
              // {"action":"click","test_id":"region","expected_value":""}

              const element = await screen.findByTestId('region');
              userEvent.click(element);
            },
            async () => {
              // Click selected item to open dropdown list
              // {"action":"click","test_id":"selectedItem","expected_value":""}

              const element = await screen.findByTestId('selectedItem');
              userEvent.click(element);
            },
            async ({ regionName }: ExampleProps) => {
              // Click listitem (+44) United Kingdom in the dropdown list
              // {"action":"click","test_id":"(+44) United Kingdom","expected_value":"(+44) United Kingdom"}

              const element = await screen.findByTestId(regionName);
              userEvent.click(element);
            },
            async ({ areaCode }: ExampleProps) => {
              const element = screen.getByTestId('areaCodeInputField');
              userEvent.type(element, areaCode);
            },
            async () => {
              // Click save button
              // {"action":"click","test_id":"saveButton","expected_value":""}

              const element = await screen.findByTestId('saveButton');
              userEvent.click(element);
            },
            async () => {
              // Click back button
              // {"action":"click","test_id":"backButton","expected_value":""}

              const element = await screen.findByTestId('backButton');
              userEvent.click(element);
            },
            NavigateToDialer,
            async () => {
              // Wait for render ready
              // {"custom_step":{"WaitForRenderReady":{}},"action":"wait","wait_type":"None","test_id":"","expected_value":""}
              await customSteps['WaitForRenderReady'].action();
            },
            async ({ phoneNumber }: ExampleProps) => {
              // Type +16504091529 in the 'To' field
              // {"action":"type","test_id":"recipientsInput","expected_value":"+16504091529"}

              const element = screen.getByTestId('recipientsInput');
              userEvent.type(element, phoneNumber);
            },
            async () => {
              if (screen.queryByTestId('callButton')) {
                userEvent.click(screen.getByTestId('callButton'));
              }
              // Press Enter in the 'To' field
              // {"custom_step":{"FireEventKeyDown":{"elementId":"recipientsInput","key":"Enter","code":"Enter"}},"action":"customStep","test_id":"recipientsInput","expected_value":""}
              await customSteps['FireEventKeyDown'].action({
                elementId: 'recipientsInput',
                key: 'Enter',
                code: 'Enter',
              });
            },
            (async (
              { callType, callingMode, displayNumber }: ExampleProps,
              { app },
            ) => {
              await whenStateChange(() => {
                if (callType === 'RingCentral Phone') {
                  expect(app.modules.Softphone.makeCall).toHaveBeenCalledWith(
                    displayNumber,
                    callingMode,
                  );
                } else {
                  expect(app.modules.Ringout.makeCall).toHaveBeenCalledWith(
                    expect.objectContaining({
                      toNumber: displayNumber,
                    }),
                  );
                }
              });
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}

export const ClickSaveButton: StepFunction<ExampleProps> = async (
  { callType },
  context,
) => {
  // Click save button
  // {"action":"click","test_id":"saveButton","expected_value":""}
  const element = await screen.findByTestId('saveButton');

  await whenStateChange(() => {
    const buttonDisabled = element.getAttribute('aria-disabled') !== 'false';

    expect(buttonDisabled).toBeFalsy();
  });

  userEvent.click(element);
};
