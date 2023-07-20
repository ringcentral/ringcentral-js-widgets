import type { RcBaseSize } from '@ringcentral/juno';

import type { DialoutStatusesType } from '../enums';

export type EvDialerUIProps = {
  toNumber: string;
  size: RcBaseSize<'small' | 'medium' | 'large'>;
  dialoutStatus: DialoutStatusesType;
  /** DialPad call button disabled state */
  dialButtonDisabled: boolean;
  currentLocale: string;
  hasDialer: boolean;
};

export type EvDialerUIFunctions = {
  dialout(): void;
  goToManualDialSettings(): void;
  setToNumber(value: string): void;
  hangup(): void;
};
