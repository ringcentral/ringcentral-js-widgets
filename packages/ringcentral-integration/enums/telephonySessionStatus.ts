import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { PartyStatusCode } from 'ringcentral-call-control/lib/Session';

export const telephonySessionStatus = ObjectMap.fromObject(PartyStatusCode);

export default telephonySessionStatus;
