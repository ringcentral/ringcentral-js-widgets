import { ComposeTextPanel } from '../../components/ComposeTextPanelV2';
import { connectModule } from '../../lib/phoneContext';

export const ComposeTextPage = connectModule((phone) => phone.composeTextUI)(
  ComposeTextPanel,
);
