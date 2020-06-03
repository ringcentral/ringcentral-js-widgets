import { createEnum } from 'ringcentral-integration/lib/Enum';

export const logTypes = createEnum([
  'CALL_DISPOSITION_FAILURE',
  'CALL_DISPOSITION_SUCCESS',
]);
