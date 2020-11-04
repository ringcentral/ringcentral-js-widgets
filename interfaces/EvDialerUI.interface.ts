import { RcFabIconButtonProps } from '@ringcentral/juno';

import { DialoutStatusesType } from '../enums';

export type EvDialerUIProps = {
  toNumber: string;
  size: RcFabIconButtonProps['size'];
  dialoutStatus: DialoutStatusesType;
  /** DialPad call button disabled state */
  dialButtonDisabled: boolean;
  currentLocale: string;
  hasDialer: boolean;
};

export type EvDialerUIFunctions = {
  dialout(): void;
  goToManualDialSettings(): void;
  checkOnCall(): void;
  setToNumber(value: string): void;
  hangup(): void;
};
