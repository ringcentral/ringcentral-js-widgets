import Locale from 'ringcentral-integration/modules/Locale';
import { ActiveCallControl } from '../../../ringcentral-integration/modules/ActiveCallControlV2';
import RouterInteraction from '../RouterInteraction';

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
