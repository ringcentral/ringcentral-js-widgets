import { RequeueCallGroupPanel } from '../../components/RequeueCallPanel/RequeueCallGroupPanel';
import { connectModule } from '../../lib/connectModule';

export interface RequeueCallGroupPageProps {
  id: string;
}

export const RequeueCallGroupPage = connectModule<RequeueCallGroupPageProps>(
  (phone) => phone.evTransferCallUI,
)(RequeueCallGroupPanel);
