import type { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import type { PickFunctions } from '@ringcentral-integration/utils/src/typeFunctions/PickFunctions';

import type { RcModuleType } from '../RcModule';

import type { RcUIModuleV2 } from './RcUIModule';

export type RcUIModuleType<T extends RcUIModuleV2> = RcModuleType<
  T,
  'getUIProps' | 'getUIFunctions'
>;

export type UIFunctions<T extends Record<string, any>> = PickFunctions<T>;

export type UIProps<T extends Record<string, any>> = OmitFunctions<T>;
