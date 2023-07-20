import type { ReactNode } from 'react';

import type { PhoneType } from '@ringcentral-integration/commons/enums/phoneTypes';
import type { ContactModel } from '@ringcentral-integration/commons/interfaces/Contact.model';

export interface onClickMailTo {
  onClickMailTo?(email: string, contactType: string): any;
}

export interface formatNumber {
  formatNumber(phoneNumber: string): string;
}

export interface clickToDial {
  canCallButtonShow(phoneType: PhoneType): boolean;
  onClickToDial(contact: ContactModel, phoneNumber: string): any;
}

export interface clickToSMS {
  canTextButtonShow(phoneType: PhoneType): boolean;
  onClickToSMS(contact: ContactModel, phoneNumber: string): any;
}

export interface sourceNodeRenderer {
  // @ts-expect-error TS(7031): Binding element 'string' implicitly has an 'any' t... Remove this comment to see the full error message
  sourceNodeRenderer?({ sourceType: string }): ReactNode;
}
