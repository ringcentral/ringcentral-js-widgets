import { SettingsPanel } from '../../components/SettingsPanel';
import { connectModule } from '../../lib/connectModule';

export const SettingsPage = connectModule((phone) => phone.evSettingsUI)(
  SettingsPanel,
);
