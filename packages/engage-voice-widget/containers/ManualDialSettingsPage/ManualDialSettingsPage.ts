import { ManualDialSettingsPanel } from '../../components/ManualDialSettingsPanel';
import { connectModule } from '../../lib/connectModule';
import type { EvManualDialSettingsRenderProps } from '../../modules/EvManualDialSettingsUI/EvManualDialSettingsUI.interface';

export const ManualDialSettingsPage =
  connectModule<EvManualDialSettingsRenderProps>(
    (phone) => phone.evManualDialSettingsUI,
  )(ManualDialSettingsPanel);
