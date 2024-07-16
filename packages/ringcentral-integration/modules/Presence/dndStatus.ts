import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const dndStatus = ObjectMap.fromObject({
  takeAllCalls: 'TakeAllCalls',
  doNotAcceptAnyCalls: 'DoNotAcceptAnyCalls',
  doNotAcceptDepartmentCalls: 'DoNotAcceptDepartmentCalls',
  takeDepartmentCallsOnly: 'TakeDepartmentCallsOnly',
} as const);

export type DNDStatusValueType = (typeof dndStatus)[keyof typeof dndStatus];
