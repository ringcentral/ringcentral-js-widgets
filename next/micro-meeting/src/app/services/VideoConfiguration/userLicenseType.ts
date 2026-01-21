import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const userLicenseType = ObjectMap.fromKeys(['Free', 'Paid']);

export type UserLicenseType = keyof typeof userLicenseType;
