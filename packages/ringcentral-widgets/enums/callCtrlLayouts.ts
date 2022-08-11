import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callCtrlLayouts = ObjectMap.prefixKeys(
  ['normalCtrl', 'mergeCtrl', 'conferenceCtrl', 'completeTransferCtrl'],
  'callCtrlLayouts',
);

export default callCtrlLayouts;
