import { PartyStatusCode } from 'ringcentral-call-control/lib/Session';

import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const telephonySessionStatus = ObjectMap.fromObject(PartyStatusCode);

export default telephonySessionStatus;
