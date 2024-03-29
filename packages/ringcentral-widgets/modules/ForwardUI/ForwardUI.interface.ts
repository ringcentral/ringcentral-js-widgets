import type { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';

import type RouterInteraction from '../RouterInteraction';

export interface ForwardUIOptions {}
export interface Deps {
  locale: Locale;
  ForwardUIOptions?: ForwardUIOptions;
  activeCallControl: ActiveCallControl;
  routerInteraction: RouterInteraction;
}

export interface ForwardUIFunctions {
  onForward: (
    forwardNumber: string,
    telephonySessionId: string,
  ) => Promise<void>;
  onBackClick: () => void;
}
export interface ForwardUIProps {
  telephonySessionId: string;
  currentLocale: string;
}
