/**
 * RCI-4591: Support hyperlink in message content
 * https://test_it_domain/test-cases/RCI-4591
 * Preconditions:
 * 1. CTI app is installed and enabled
 * 2.Userhas logged into CTI app
 * Entry point(/s):
 *
  | textContent |expectLinkLength |expectTextContent |
  | This is a link: https://www.ringcentral.com/legal/emergency-services.html |1 | This is a link: https://www.ringcentral.com/legal/emergency-services.html |
	| Here are some links: baidu.cn, baidu.com |2 | Here are some links: baidu.cn, baidu.com |
	| Hello http://www.baidu.com world |1 |Hellohttp://www.baidu.com world |
	| baidu.com |1 |baidu.com |

 * This is a link: https://www.ringcentral.com/legal/emergency-services.html
 * Here are some links: baidu.cn, baidu.com
 *
  | mailContent |expectLinkLength |expectMailContent |
  | pls send email to: klay@company.com |1 |pls send email to: klay@company.com |
	|  klay.chen@rc.com harry.+symbol@anexample.com |2 | klay.chen@rc.comharry.+symbol@anexample.com |
	| simple@example.com |0 |simple@example.com |
	| simple@example |0 |simple@example |

 * There is {textContent} show on conversation page
 * There is{mailContent}show on conversation page
 */
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
  common,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

import { mockMessageListData } from '../../../../../__mock__';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CheckConversationPageHyperLink,
  ClickConversationPageHyperLink,
  ClickMessageItem,
} from '../../../../../steps/Messages';
import {
  CreateMock,
  MockMessagePut,
  MockMessageSync,
} from '../../../../../steps/Mock';
import { NavigateToMessagesTab } from '../../../../../steps/Navigate';
import { CheckEventTracking } from '../../../../../steps/Tracking';

@autorun(test)
@it
@p2
@common
@title('Support hyperlink in message content')
export class RCI4591 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => (
    <CreateMock enableSeparateMessageSyncMock={false} />
  );

  @examples([
    {
      message:
        'This is a link: https://www.ringcentral.com/legal/emergency-services.html',
      expectLinkLength: 1,
      hyperlinkType: 'website',
      links: ['https://www.ringcentral.com/legal/emergency-services.html'],
    },
    {
      message: 'Here are some links: baidu.cn, baidu.com',
      expectLinkLength: 2,
      hyperlinkType: 'website',
      links: ['http://baidu.cn', 'http://baidu.com'],
    },
    {
      message: 'Hello http://www.baidu.com world',
      expectLinkLength: 1,
      hyperlinkType: 'website',
      links: ['http://www.baidu.com'],
    },
    {
      message: '你好baidu.com',
      expectLinkLength: 1,
      hyperlinkType: 'website',
      links: ['http://你好baidu.com'],
    },
    {
      message: 'pls send email to: klay@company.com',
      expectLinkLength: 1,
      hyperlinkType: 'email',
      links: ['mailto:klay@company.com'],
    },
    {
      message: '你好 klay.chen@rc.com harry.+symbol@anexample.com',
      expectLinkLength: 2,
      hyperlinkType: 'email',
      links: ['mailto:klay.chen@rc.com', 'mailto:harry.+symbol@anexample.com'],
    },
    {
      message: 'simple@example.com啊',
      expectLinkLength: 1,
      hyperlinkType: 'email',
      link: ['mailto:simple@example.com'],
    },
    {
      message: '你好simple@example',
      expectLinkLength: 0,
      hyperlinkType: 'email',
    },
  ])
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Support hyperlink in message content"
        action={[
          CreateMock,
          <MockMessageSync
            isDefaultInit
            repeat={0}
            handler={(mockData) => ({
              ...mockData,
              ...mockMessageListData({
                subject: this.example.message,
              }),
            })}
          />,
          MockMessagePut,
          Login,
        ]}
      >
        <When
          desc="Direct to entry point"
          action={[NavigateToMessagesTab, ClickMessageItem]}
        />
        <Then
          desc="{textContent}/{mailContent} should display as {expectTextContent}
                Hyperlink length is {expectLinkLength}"
          action={
            <CheckConversationPageHyperLink
              linksAmount={this.example.expectLinkLength}
              content={this.example.message}
              links={this.example.links}
            />
          }
        />
        <When
          desc="Click the hyperlink"
          action={() => {
            if (this.example.expectLinkLength !== 0) {
              return <ClickConversationPageHyperLink />;
            }
          }}
        />
        <Then
          desc="Should open the URL in a new browser tab in the same browser
										[Mixpanel check]
	Event name: Click hyperlink/SMS conversation
	Hyperlink type:website
										Event name: Click hyperlink/SMS conversation
										Hyperlink type:website/email"
          action={() => {
            if (this.example.expectLinkLength !== 0) {
              return (
                <CheckEventTracking
                  event="Click hyperlink/SMS conversation"
                  data={{ 'Hyperlink type': this.example.hyperlinkType }}
                />
              );
            }
          }}
        />
        <When desc="Direct to entry point 2" />
        <Then
          desc="{mailContent} should display as{expectMailContent}
										Hyperlink length is{expectLinkLength}"
        />
        <When desc="Click the hyperlink" />
        <Then
          desc="Should open with the 'mailto:' portal, then follow OS default behavior
										[Mixpanel check]
	Event name: Click hyperlink/SMS conversation
	Hyperlink type:email
										Event name: Click hyperlink/SMS conversation
										Hyperlink type:email"
        />
      </Scenario>
    );
  }
}
