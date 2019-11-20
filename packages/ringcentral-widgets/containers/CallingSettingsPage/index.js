import CallingSettingsPanel from '../../components/CallingSettingsPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.callingSettingsUI)(
  CallingSettingsPanel,
);
