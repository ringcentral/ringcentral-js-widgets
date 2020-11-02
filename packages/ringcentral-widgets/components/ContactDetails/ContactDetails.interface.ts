import { ReactNode } from 'react';
import { ContactModel } from 'ringcentral-integration/interfaces/Contact.model';
import { PhoneType } from 'ringcentral-integration/enums/phoneTypes';

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
  sourceNodeRenderer?({ sourceType: string }): ReactNode;
}
