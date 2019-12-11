import { ReactNode } from 'react';
import { ContactModel } from 'ringcentral-integration/models/Contact.model';

export interface onClickMailTo {
  onClickMailTo?(email: string, contactType: string): any;
}

export interface formatNumber {
  formatNumber(phoneNumber: string): string;
}

export interface onClickToDial {
  onClickToDial(contact: ContactModel, phoneNumber: string): any;
}

export interface onClickToSMS {
  onClickToSMS(contact: ContactModel, phoneNumber: string): any;
}

export interface sourceNodeRenderer {
  sourceNodeRenderer?({ sourceType: string }): ReactNode;
}
