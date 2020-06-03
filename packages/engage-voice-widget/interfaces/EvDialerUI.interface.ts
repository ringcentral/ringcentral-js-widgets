import { RcFabIconButtonProps } from '@ringcentral-integration/rcui';

import { DialoutStatusesType } from '../enums';

export type EvDialerUIProps = {
  toNumber: string;
  size: RcFabIconButtonProps['size'];
  dialoutStatus: DialoutStatusesType;
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
