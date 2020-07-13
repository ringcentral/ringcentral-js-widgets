import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const activeCallControlStatus = ObjectMap.fromObject({
  hold: 'Hold',
  setUp: 'Setup',
  proceeding: 'Proceeding',
} as const);

export default activeCallControlStatus;
