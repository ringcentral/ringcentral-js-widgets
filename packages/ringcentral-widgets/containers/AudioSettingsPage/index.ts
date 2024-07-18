import { AudioSettingsPanel } from '../../components/AudioSettingsPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.audioSettingsUI)(
  AudioSettingsPanel,
);
