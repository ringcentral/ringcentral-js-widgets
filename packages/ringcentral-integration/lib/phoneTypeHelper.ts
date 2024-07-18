import type PhoneNumberResource from '@rc-ex/core/lib/definitions/PhoneNumberResource';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { addIndex, filter, reduce, sort } from 'ramda';

import { phoneTypes } from '../enums/phoneTypes';
import type { PhoneNumberModel } from '../interfaces/PhoneNumber.model';

export const phoneTypeOrder = Object.freeze([
  phoneTypes.extension,
  phoneTypes.direct,
  phoneTypes.contact,
  phoneTypes.mobile,
  phoneTypes.business,
  phoneTypes.home,
  phoneTypes.fax,
  phoneTypes.other,

  // not in particular order
  phoneTypes.phone,
  phoneTypes.unknown,
  phoneTypes.company,
]);

export const phoneTypeOrderMap: Record<string, any> = Object.freeze(
  addIndex<string, any>(reduce)(
    (acc, item, idx) => {
      acc[item] = idx;
      return acc;
    },
    {},
    phoneTypeOrder,
  ),
);

export const filterByPhoneTypes = filter<PhoneNumberModel>((item) =>
  ObjectMap.hasValue(phoneTypes, item.phoneType),
);

export const sortByPhoneTypes = sort<PhoneNumberModel>(
  (a, b) => phoneTypeOrderMap[a.phoneType] - phoneTypeOrderMap[b.phoneType],
);

const supportedUsageTypePhoneTypeMap: Partial<
  Record<NonNullable<PhoneNumberResource['usageType']>, string>
> = {
  ContactNumber: phoneTypes.contact,
  MobileNumber: phoneTypes.mobile,
  DirectNumber: phoneTypes.direct,
};

const SUPPORTED_USAGE_TYPES = Object.keys(supportedUsageTypePhoneTypeMap);

// Support all direct number + Mobile and Contact Number
export const isSupportedPhoneNumber = (phone: PhoneNumberResource) =>
  phone.type ||
  (!phone.type && SUPPORTED_USAGE_TYPES.includes(phone.usageType!));

export const convertUsageTypeToPhoneType = (
  usageType: PhoneNumberResource['usageType'],
) => supportedUsageTypePhoneTypeMap[usageType!] || phoneTypes.direct;
