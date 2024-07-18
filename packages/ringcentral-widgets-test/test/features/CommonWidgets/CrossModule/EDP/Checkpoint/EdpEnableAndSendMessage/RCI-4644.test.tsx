/**
 * RCI-4644: Send the text to ext. when match (DT<=MEL) without SMS permission
 * https://test_it_domain/test-cases/RCI-4644
 * Preconditions:
 * CTI app is integrated,
 * The user is logged-in to 3rd party
 * The user has logged in to the CTI app
 * The user without SMS permission only pager permission
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 * Entry point(/s):
 * CTI app is integrated,
 * The user is logged-in to 3rd party
 * The user has logged in to the CTI app
 * The user without SMS permission only pager permission
 * User has 'Max extension number length' as{maxExtensionLength}digits
 * User has default area code as{Default area code}
 *
  | Country |MaxExtensionLength |Dialing Length |Dialing text |Default area code |parsed number |NPC category |Contact |
  | RC-UK |8 |7 |3135003 |205 | 3135003 |Extension |Sarah |

 */
import { Category } from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';
import {
  autorun,
  common,
  examples,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../../steps/Messages';
import {
  CreateMock,
  MockNumberParserV2,
  MockPermission,
  MockMessageList,
  MockGetPhoneNumber,
} from '../../../../../../steps/Mock';
import { NavigateToComposeText } from '../../../../../../steps/Navigate';
import { CheckRoutePathContain } from '../../../../../../steps/Router';

@autorun(test.skip)
@it
@p2
@title('Send the text to ext. when match (DT<=MEL) without SMS permission')
@common
export class RCI4644 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp | null = CreateMock;

  @examples(`
    | country | maxExtensionLength | dialingLength | dialingText | defaultAreaCode | parsedNumber | npcCategory | Contact |
    | 'RC-UK' | 8                  | 7             | '3135003'   | 205             | '3135003'    | 'Extension' | 'Sarah' |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Send the text to ext. when match (DT<=MEL) without SMS permission"
        action={({ dialingText }: any) => [
          CreateMock,
          MockGetPhoneNumber,
          <MockNumberParserV2
            handler={(mockData) => {
              mockData.results[0].category = Category.Extension;
              mockData.results[0].originalString = dialingText;
              mockData.results[0].formats = [
                {
                  dialable: dialingText,
                  dialableExtended: dialingText,
                } as any,
              ];
              mockData.results[0].numberDetails = {
                extensionNumber: dialingText,
              } as any;
              return {
                ...mockData,
                results: [mockData.results[0]],
              };
            }}
          />,
          <MockPermission
            handler={(features: any[]) => {
              return features
                .filter((feature) => feature.id !== 'SMSSending')
                .concat([
                  {
                    id: 'SMSSending',
                    available: false,
                  },
                ]);
            }}
          />,
          <MockMessageList
            handler={(mockData) => ({
              ...mockData,
              records: [],
            })}
            repeat={0}
            isDefaultInit
          />,
        ]}
      >
        <When
          desc="> Input {dialingText} in 'To' filed > Input test text in text box
										> Click the Send button"
          action={({ dialingText }: any) => [
            Login,
            NavigateToComposeText,
            <SendSMS phoneNumber={dialingText} textMessage="test message" />,
          ]}
        />
        <Then
          desc="Message sent, checked Contact on the message detail page is {Contact}.
										Send the message successfully
										Note(/s):Contact checking doesn't be supported in HubSpot 22.2.30 due to RC contacts, we just check the phone number is correct now"
          action={[<CheckRoutePathContain path="/conversations/" />]}
        />
      </Scenario>
    );
  }
}
