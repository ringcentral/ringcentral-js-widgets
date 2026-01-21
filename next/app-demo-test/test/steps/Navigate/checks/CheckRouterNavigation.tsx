import { RouterPlugin } from '@ringcentral-integration/next-core';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';

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

export const CheckRouterNavigation: StepFunction<
  CheckRouterNavigationProps
> = async ({ toPage = 'Settings' }, { app }) => {
  const targetRegExp = targets[toPage];
  const router = app.container.got(RouterPlugin)!;
  if (targetRegExp) {
    await whenStateChange(() => {
      expect(targetRegExp.test(router.currentPath)).toBeTruthy();
    }).catch(() => {
      throw new Error(
        [
          `Navigation to the ${toPage} Failed,`,
          `Current path: ${router.currentPath},`,
          `targetRegExp: ${targetRegExp}`,
        ].join('\r\n'),
      );
    });
  } else {
    throw new Error(`Navigation to the ${toPage} is not implement`);
  }
};
