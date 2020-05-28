import { connectModule } from '../../lib/connectModule';
import { SettingsPanel } from '../../components/SettingsPanel';

export const SettingsPage = connectModule((phone) => phone.evSettingsUI)(
  SettingsPanel,
);
