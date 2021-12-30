import RegionSettingsPanel from '../../components/RegionSettingsPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.regionSettingsUI)(
  RegionSettingsPanel,
);
