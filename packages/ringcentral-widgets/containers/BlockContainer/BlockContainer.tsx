import { BlockPanel } from '../../components/BlockPanel';
import { connectModule } from '../../lib/phoneContext';
import type { GetBlockUIProps } from '../../modules/BlockUI';

export const BlockContainer = connectModule<any, GetBlockUIProps>(
  (phone: any) => phone.blockUI,
)(BlockPanel);
