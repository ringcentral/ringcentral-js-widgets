import { connectModule } from '../../lib/phoneContext';
import SettingsPanel from '../../components/SettingsPanel';

export default connectModule((phone) => phone.settingsUI)(SettingsPanel);
