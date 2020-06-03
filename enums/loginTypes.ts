import { createEnum } from 'ringcentral-integration/lib/Enum';

export const loginTypes = createEnum([
  'integratedSoftphone',
  'externalPhone',
  'RC_PHONE',
]);
