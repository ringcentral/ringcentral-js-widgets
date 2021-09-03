import { connectModule } from '../../lib/phoneContext';
import RegionSettingsPanel from '../../components/RegionSettingsPanel';

export default connectModule((phone) => phone.regionSettingsUI)(
  RegionSettingsPanel,
);
