import { SettingsPanel } from '../../components/SettingsPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.settingsUI)(SettingsPanel);
