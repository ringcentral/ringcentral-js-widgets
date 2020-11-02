import { PhoneType } from '../enums/phoneTypes';

export interface PhoneNumberModel {
  phoneNumber: string;
  phoneType: PhoneType;
  rawPhoneNumber?: string;
}
