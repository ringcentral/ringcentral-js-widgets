import { waitWithCheck } from '@ringcentral-integration/commons/lib/time';

import { StepFunction } from '../../../lib/step';

const targets = {
  Dialer: /^\/dialer$/i,
  Login: /^\/$/i,
  Settings: /^\/settings$/i,
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
      await waitWithCheck(() =>
        targetRegExp.test(phone.routerInteraction.currentPath),
      ).catch(() => {
        throw new Error(`Navigation to the ${toPage} Failed`);
      });
    } else {
      throw new Error(`Navigation to the ${toPage} is not implement`);
    }
  };
