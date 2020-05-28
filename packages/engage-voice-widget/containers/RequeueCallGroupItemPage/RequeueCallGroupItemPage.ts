import { RequeueCallGroupDetailPanel } from '../../components/RequeueCallPanel/RequeueCallGroupPanel';
import { connectModule } from '../../lib/connectModule';

export interface RequeueGroupItemPageProps {
  id: string;
  groupId: string;
}

export const RequeueCallGroupItemPage = connectModule<
  RequeueGroupItemPageProps
>((phone) => phone.evTransferCallUI)(RequeueCallGroupDetailPanel);
