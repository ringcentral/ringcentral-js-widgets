import { createEnum } from 'usm/lib/utils/enum';

export const moduleStatuses = createEnum(
  ['pending', 'initializing', 'ready', 'resetting'],
  'module',
);
