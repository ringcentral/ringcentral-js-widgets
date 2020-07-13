import { sort, reduce, filter, addIndex } from 'ramda';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import phoneTypes from '../enums/phoneTypes';
import { PhoneNumberModel } from '../models/PhoneNumber.model';

export const phoneTypeOrder = Object.freeze([
  phoneTypes.extension,
  phoneTypes.direct,
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

export const phoneTypeOrderMap = Object.freeze(
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
