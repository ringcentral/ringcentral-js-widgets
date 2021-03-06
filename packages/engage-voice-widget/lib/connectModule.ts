import {
  connectModule as baseConnectModule,
  connectModuleProps,
} from '@ringcentral-integration/widgets/lib/phoneContext';

import { EvPhone } from '../interfaces';

export const connectModule = <T = any>(props: connectModuleProps<EvPhone>) =>
  baseConnectModule<connectModuleProps<EvPhone>, T>(props as any);
