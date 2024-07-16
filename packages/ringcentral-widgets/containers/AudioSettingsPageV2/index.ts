import { AudioSettingsPanel } from '../../components/AudioSettingsPanelV2';
import { connectModule } from '../../lib/phoneContext';

const AudioSettingsPage = connectModule((phone) => phone.audioSettingsUI)(
  AudioSettingsPanel,
);

export { AudioSettingsPage };
