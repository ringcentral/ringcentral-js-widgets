import type { HeaderViewProps } from '../../components/HeaderView';
import { HeaderView } from '../../components/HeaderView';
import { connectModule } from '../../lib/phoneContext';

export const HeaderContainer = connectModule<any, Partial<HeaderViewProps>>(
  ({ headerViewUI }) => headerViewUI,
)(HeaderView);
