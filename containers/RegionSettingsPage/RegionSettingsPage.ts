import RegionSettingsPanel from '../../components/RegionSettingsPanel';
import { connectModule } from '../../lib/phoneContext';
import type { RegionSettingsUIContainerProps } from '../../modules/RegionSettingsUI';

export const RegionSettingsPage = connectModule<
  any,
  RegionSettingsUIContainerProps
>((phone) => phone.regionSettingsUI)(RegionSettingsPanel);
