import { MainViewPanel } from '../../components/MainViewPanel';
import { connectModule } from '../../lib/connectModule';

export const MainViewPage = connectModule((phone) => phone.mainViewUI)(
  MainViewPanel,
);
