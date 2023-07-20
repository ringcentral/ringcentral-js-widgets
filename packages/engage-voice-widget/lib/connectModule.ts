import type { connectModuleProps } from '@ringcentral-integration/widgets/lib/phoneContext';
import { connectModule as baseConnectModule } from '@ringcentral-integration/widgets/lib/phoneContext';

import type { EvPhone } from '../interfaces';

export const connectModule = <T = any>(props: connectModuleProps<EvPhone>) =>
  baseConnectModule<connectModuleProps<EvPhone>, T>(props as any);
