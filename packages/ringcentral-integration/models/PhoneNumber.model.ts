import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import phoneTypes from '../enums/phoneTypes';

export interface PhoneNumberModel {
  phoneNumber: string;
  phoneType: ObjectMapValue<typeof phoneTypes>;
  rawPhoneNumber?: string;
}
