import { waitUntilTo } from '@ringcentral-integration/commons/utils';

import { StepFunction } from '../../../lib/step';

const targets = {
  Dialer: /^\/dialer$/i,
  Login: /^\/$/i,
  Settings: /^\/settings$/i,
  ConversationLog: /^\/conversations\/(\S)+\/log/,
  Conversations: /^\/conversations\/(\S)/,
  History: /^\/history$/i,
};

export interface CheckRouterNavigationProps {
  toPage?: keyof typeof targets;
}

export const CheckRouterNavigation: StepFunction<CheckRouterNavigationProps> =
  async (props, context) => {
    const { toPage = 'Settings' } = props;
    const { phone } = context;
    const targetRegExp = targets[toPage];
    if (targetRegExp) {
      await waitUntilTo(() => {
        expect(
          targetRegExp.test(phone.routerInteraction.currentPath),
        ).toBeTruthy();
      }).catch(() => {
        throw new Error(
          [
            `Navigation to the ${toPage} Failed,`,
            `Current path: ${phone.routerInteraction.currentPath},`,
            `targetRegExp: ${targetRegExp}`,
          ].join('\r\n'),
        );
      });
    } else {
      throw new Error(`Navigation to the ${toPage} is not implement`);
    }
  };
