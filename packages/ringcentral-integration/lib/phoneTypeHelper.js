import { sort, reduce } from 'ramda';
import phoneTypes from '../enums/phoneTypes';

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
  reduce(
    (acc, item, idx) => {
      acc[item] = idx;
      return acc;
    },
    {},
    phoneTypeOrder,
  ),
);

export const sortByPhoneTypes = sort(
  (a, b) => phoneTypeOrderMap[a.phoneType] - phoneTypeOrderMap[b.phoneType],
);
